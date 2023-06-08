using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using WordWonderBackend.Main.Common.Interfaces;
using WordWonderBackend.Main.Common.Models.DTO;
using WordWonderBackend.Main.Common.Models.Enums;
using WordWonderBackend.Main.DAL;

namespace WordWonderBackend.Main.BL.Services
{
    public class BookListService : IBookListService
    {
        private readonly int _pageSize = 5;
        private readonly MainDbContext _context;
        public BookListService(MainDbContext context) 
        {
            _context = context;
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
    }
}
