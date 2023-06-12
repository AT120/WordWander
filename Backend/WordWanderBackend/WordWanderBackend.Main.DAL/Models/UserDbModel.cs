using Microsoft.AspNetCore.Identity;

namespace WordWanderBackend.Main.DAL.Models;

public class UserDbModel 
{
    public Guid Id { get; set; }
    public required string UserName { get; set; }
    public required string PasswordHash { get; set; }
    public List<BookDbModel> Books { get; set; }
}