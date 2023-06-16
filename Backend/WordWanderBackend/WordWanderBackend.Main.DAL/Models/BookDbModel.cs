using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.DAL.Models
{
    public class BookDbModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }
        public string Description { get; set; }
        public string Extension { get; set; }

        public Guid UserId { get; set; }
        public UserDbModel User { get; set; }
		public List<DictionaryDbModel> Dictionary { get; set; }
		public BookShortDTO ToShortDTO()
        {
            return new BookShortDTO { Id = Id, Description = Description, Name = Name, Page = CurrentPage, PageNumber = PageCount };
        }
        public BookDbModel(string title, string description, int pageCount, string extension, Guid userId, Guid? id=null) 
        {
            Id = id==null ? Guid.NewGuid(): (Guid)id;
            Name = title;
            UserId= userId;
            Description = description;
            PageCount = pageCount;
            CurrentPage = 1;
            Extension = extension;
        }
        public BookDbModel() { }
    }
}
