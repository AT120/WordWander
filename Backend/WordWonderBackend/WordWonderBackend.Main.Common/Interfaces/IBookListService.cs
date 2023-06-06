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
        public Task<List<BookShortDTO>> GetUserBooks(int page, string name, Guid userId, BookSortParam? sort);
    }
}
