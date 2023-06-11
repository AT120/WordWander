using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Aspose.Words;
using System.Text.RegularExpressions;
using WordWonderBackend.Main.Common.Interfaces;
using WordWonderBackend.Main.Common.Models.DTO;
using WordWonderBackend.Main.Common.Models.Enums;
using WordWonderBackend.Main.DAL;
using WordWonderBackend.Main.DAL.Models;
using Aspose.Words.WebExtensions;
using WordWonderBackend.Main.Common.Models.Settings;
using Microsoft.Extensions.Options;

namespace WordWonderBackend.Main.BL.Services
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
            var query = _context.Books.Where(x=>Regex.IsMatch(x.Name, name) && x.UserId==userId).AsQueryable();
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
                case null:
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
            if(file.Length== 0 || file==null)
            {
                throw new ArgumentNullException("Файл не был загружен");
            }
            int pageCount;
            string fileExtension = Path.GetExtension(file.FileName);
            var id = Guid.NewGuid();
            using (var stream = file.OpenReadStream())
            {
                var document = new Document(stream);
                pageCount = document.PageCount;
                var filePath=_storageSettings.FolderPath+id.ToString()+fileExtension;
                document.Save(filePath);
            }
            Console.WriteLine(title, description, pageCount, fileExtension, id);
            await _context.Books.AddAsync(new BookDbModel(title, description, pageCount, fileExtension,userId, id));
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookFromList(Guid id, Guid userId)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id && x.UserId==userId);
            if (book == null)
            {
                throw new ArgumentException($"There is no book with this {id} id!");
            }
            var filePath = _storageSettings.FolderPath + book.Id + book.Extension;
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
                _context.Remove(book);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"There is no file with this {id} id!");
            }
        }
    }
}
