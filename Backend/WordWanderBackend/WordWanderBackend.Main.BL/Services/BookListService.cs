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
            var query = _context.Books.Where(x=>Regex.IsMatch(x.Name, name)).AsQueryable();
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

        public async Task PostBookToList(IFormFile file, string title, string description)
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
            await _context.Books.AddAsync(new BookDbModel(title, description, pageCount, fileExtension, id));
            await _context.SaveChangesAsync();
        }
    }
}
