using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Aspose.Words;
using System.Text.RegularExpressions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;
using Aspose.Words.WebExtensions;
using WordWanderBackend.Main.Common.Models.Settings;
using Microsoft.Extensions.Options;
using WordWanderBackend.Main.Common.Const;
using FB2Library;
using System.IO;
using SkiaSharp;
using System.Net.Mime;

namespace WordWanderBackend.Main.BL.Services
{
    public class BookListService : IBookListService
    {
        private readonly int _pageSize = 5;
        private readonly MainDbContext _context;
        private readonly StorageSettings _storageSettings;
        public BookListService(MainDbContext context, IOptions<StorageSettings> storageSettings)
        {
            _context = context;
            _storageSettings = storageSettings.Value;
        }


        public async Task<BooksPaginationDTO> GetUserBooks(int page, string name, Guid userId, BookSortParam? sort)
        {
            int pageCount;
            var query = _context.Books.Where(x => Regex.IsMatch(x.Name, name) && x.UserId == userId).AsQueryable();
            int bookCount = await query.CountAsync();

            if ((bookCount % _pageSize) == 0)
            {
                pageCount = (bookCount / _pageSize);
            }
            else
            {
                pageCount = (bookCount / _pageSize) + 1;
            }
            switch (sort)
            {
                case BookSortParam.NameAsc:
                    query = query.OrderBy(x => x.Name).AsQueryable();
                    break;

                case BookSortParam.NameDesc:
                    query = query.OrderByDescending(x => x.Name).AsQueryable();
                    break;
                case BookSortParam.TimeDesc:
                    query = query.OrderByDescending(x => x.LastOpeningTime).AsQueryable();
                    break;
                case null:
                    query = query.OrderByDescending(x => x.LastOpeningTime).AsQueryable();
                    break;
            }
            var books = await query.Skip(_pageSize * (page - 1))
                        .Take(_pageSize)
                        .Select(x => x.ToShortDTO())
                        .ToListAsync();

            return new BooksPaginationDTO(books, pageCount);
        }

        public async Task PostBookToList(IFormFile file, string title, string description, Guid userId)
        {
            if (file.Length == 0 || file == null)
            {
                throw new ArgumentNullException("Файл не был загружен");
            }
            string fileExtension = Path.GetExtension(file.FileName);
            if (!FileExtensions.AvaliableFileExtensions.Contains(fileExtension))
            {
                throw new InvalidOperationException($"Unsupported file format: {fileExtension}");
            }
            var id = Guid.NewGuid();
            var filePath = _storageSettings.FolderPath + id.ToString() + fileExtension;
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            await _context.Books.AddAsync(new BookDbModel(title, description, fileExtension, userId, id));
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookFromList(Guid id, Guid userId)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id && x.UserId == userId);
            if (book == null)
            {
                throw new ArgumentException($"There is no book with this {id} id!");
            }
            var filePath = _storageSettings.FolderPath + book.Id + book.Extension;
            if (File.Exists(filePath))
            {
                _context.Remove(book);
                await _context.SaveChangesAsync();
                await Task.Run(() => File.Delete(filePath));
            }
            else
            {
                throw new ArgumentException($"There is no file with this {book.Name} name!");
            }
        }

        public async Task<FileStream> GetBookById(Guid id, Guid userId)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == id);
            if (book == null)
            {
                throw new ArgumentException($"This user {userId} haven't go book with this {id} id!");
            }
            MemoryStream memoryStream = new MemoryStream();
            var filePath = _storageSettings.FolderPath + book.Id + book.Extension;

            return new FileStream(filePath, FileMode.Open);

            // using (var fileStream = new FileStream(filePath, FileMode.Open))


            // {
            //     await fileStream.CopyToAsync(memoryStream);
            // }
            // IFormFile file = new FormFile(memoryStream, 0, memoryStream.Length, id.ToString(), id.ToString())
            // {
            //     Headers = new HeaderDictionary(),
            // };
            // return file;
        }
    }
}
