using System.Security.Claims;
using BCrypt.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Const;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.Enums;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Services;

public class AuthService : IAuthService
{
    private readonly MainDbContext _dbcontext;
    private readonly IPasswordHasher<UserDbModel> _passwordHasher;
    public AuthService(MainDbContext dbc, IPasswordHasher<UserDbModel> ph)
    {
        _dbcontext = dbc;
        _passwordHasher = ph;
    }

    public async Task Register(string username, string password, Role role)
    {
        if (password.Length < 5)
            throw new BackendException(400, "Password is too short");

        await _dbcontext.Users.AddAsync(new UserDbModel
        {
            UserName = username,
            Role = role,
            PasswordHash = _passwordHasher.HashPassword(null, password)
        });

        try
        {
            await _dbcontext.SaveChangesAsync();
        }
        catch
        {
            throw new BackendException(400, "This username is already taken");
        }
    }


    public async Task Login(string username, string password, HttpContext context)
    {
        var LoginFailed = new BackendException(401, "Wrong username or password");
        var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.UserName == username)
            ?? throw LoginFailed;

        var res = _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, password);
        if (res == PasswordVerificationResult.Failed)
            throw LoginFailed;

        await CookieSignIn(user, context);
    }


    public async Task Logout(HttpContext context)
    {
        await context.SignOutAsync();
    }


    private static async Task CookieSignIn(UserDbModel user, HttpContext context)
    {
        var claims = new List<Claim> { 
            new Claim(ClaimsType.UserId, user.Id.ToString()) ,
            new Claim(ClaimsType.Role, user.Role.ToString())
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await context.SignInAsync(new ClaimsPrincipal(identity));
    }

}