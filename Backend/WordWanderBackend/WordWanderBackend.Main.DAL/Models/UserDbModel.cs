using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.DAL.Models;

public class UserDbModel
{
    public Guid Id { get; set; }
    public required string UserName { get; set; }
    public required string PasswordHash { get; set; }
    public List<BookDbModel> Books { get; set; }

    public Role Role { get; set; }
    public List<InvitationDbModel> Invations { get; set; }
    public List<GroupDbModel> TeacherGroups { get; set; }
    public List<GroupDbModel> UserGroups { get; set; }

    public TranslationApi PrefferedApi { get; set; }
    public int PrefferedFontSize { get; set; }
    public ColorTheme PrefferedColorTheme { get; set; }
    public List<DictionaryDbModel> Dictionary {get; set; }


    public UserDTO ToDTO()
    {
        return new UserDTO { Id = Id, UserName = UserName };
    }
}