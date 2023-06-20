using Microsoft.AspNetCore.Http;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Common.Interfaces;

public interface IAuthService
{
    public Task Register(string username, string password, Role role);
    public Task Login(string username, string password, HttpContext context);
    public Task Logout(HttpContext context);
}