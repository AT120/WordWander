using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Common.Models.DTO;

public class UserRegisterCredsDTO
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public Role? Role { get; set; }
}