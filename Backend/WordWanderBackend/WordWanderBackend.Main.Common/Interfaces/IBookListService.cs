using Microsoft.AspNetCore.Http;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Common.Interfaces
{
    public interface IBookListService
    {
        public Task<BooksPaginationDTO> GetUserBooks(int page, string name, Guid userId, BookSortParam? sort);
        public Task PostBookToList(IFormFile file, string title, string description, Guid userId);
        public Task DeleteBookFromList(Guid id, Guid userId);
    }
}
