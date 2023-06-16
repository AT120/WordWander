using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Configurators;

public static class AuthConfigurator
{
    public static void SetupCookieAuth(this IServiceCollection services)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options => 
            {
                // options.AccessDeniedPath = "/login"; //TODO:
                // options.
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(3);
            });
        
    }
}