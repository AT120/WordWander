using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWonderBackend.Main.Common.Models.DTO;
using WordWonderBackend.Main.Common.Models.Enums;

namespace WordWonderBackend.Main.Common.Interfaces
{
    public interface IBookListService
    {
        public Task<BooksPaginationDTO> GetUserBooks(int page, string name, Guid userId, BookSortParam? sort);
        public Task PostBookToList(IFormFile file, string title, string description, Guid userId);
        public Task DeleteBookFromList(Guid id, Guid userId);
    }
}
