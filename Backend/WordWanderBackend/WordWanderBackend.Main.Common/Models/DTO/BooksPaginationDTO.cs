using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.DTO
{
    public class BooksPaginationDTO
    {
        public List<BookShortDTO> Books { get; set; }
        public int NumberOfPages { get; set; }

        public BooksPaginationDTO(List<BookShortDTO> books, int numberOfPages) {
            Books = books;
            NumberOfPages = numberOfPages;
        }
    }
}
