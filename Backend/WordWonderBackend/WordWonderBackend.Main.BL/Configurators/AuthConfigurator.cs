using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using WordWonderBackend.Main.DAL;
using WordWonderBackend.Main.DAL.Models;

namespace WordWonderBackend.Main.BL.Configurators;

public static class AuthConfigurator
{
    public static void SetupCookieAuth(this IServiceCollection services)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options => 
            {
                options.AccessDeniedPath = "/login"; //TODO:
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(3);
            });
        
    }
}