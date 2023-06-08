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
        public string Extension { get; set; }
        public BookShortDTO ToShortDTO()
        {
            return new BookShortDTO { Id = Id, Description = Description, Name = Name };
        }
        public BookDbModel(string title, string description, int pageCount, string extension, Guid? id=null) 
        {
            Id = id==null ? Guid.NewGuid(): (Guid)id;
            Name = title;
            Description = description;
            PageCount = pageCount;
            CurrentPage = 1;
            Extension = extension;
        }
        public BookDbModel() { }
    }
}
