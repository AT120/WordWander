using Microsoft.AspNetCore.Http;

namespace WordWonderBackend.Main.Common.Interfaces;

public interface IAuthService
{
    public Task Register(string username, string password);
    public Task Login(string username, string password, HttpContext context);
    public Task Logout(HttpContext context);
}