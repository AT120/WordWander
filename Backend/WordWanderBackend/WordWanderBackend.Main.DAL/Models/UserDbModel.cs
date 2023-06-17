using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.DAL.Models;

public class UserDbModel 
{
    public Guid Id { get; set; }
    public required string UserName { get; set; }
    public required string PasswordHash { get; set; }
    public List<BookDbModel> Books { get; set; }
    
    public TranslationApi PrefferedApi { get; set; }
    public int PrefferedFontSize { get; set; }
    public ColorTheme PrefferedColorTheme { get; set; }
}