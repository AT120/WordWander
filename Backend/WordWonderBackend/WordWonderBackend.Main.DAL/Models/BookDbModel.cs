using WordWonderBackend.Main.Common.Models.DTO;

namespace WordWonderBackend.Main.DAL.Models
{
    public class BookDbModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }
        public string Description { get; set; }

        public BookShortDTO ToShortDTO()
        {
            return new BookShortDTO { Id = Id, Description = Description, Name = Name };
        }
    }
}
