using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWonderBackend.Main.Common.Models.DTO
{
    public class BookShortDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Page { get; set; }
        public int PageNumber { get; set; }
    }
}
