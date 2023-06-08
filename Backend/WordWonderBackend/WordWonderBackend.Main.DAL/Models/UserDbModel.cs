using Microsoft.AspNetCore.Identity;

namespace WordWonderBackend.Main.DAL.Models;

public class UserDbModel 
{
    public Guid Id { get; set; }
    public required string UserName { get; set; }
    public required string PasswordHash { get; set; }
}