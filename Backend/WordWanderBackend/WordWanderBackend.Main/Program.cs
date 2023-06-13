using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WordWanderBackend.Main.BL.Configurators;
using WordWanderBackend.Main.BL.Services;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.Settings;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var storageString = "Storage";
services.Configure<StorageSettings>(builder.Configuration.GetSection(storageString));
services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
                      });
});
builder.AddDB<MainDbContext>();
services.AddControllers();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddScoped<IBookListService, BookListService>();
services.AddTransient<IPasswordHasher<UserDbModel>, PasswordHasher<UserDbModel>>(); 
services.AddScoped<IAuthService, AuthService>();
services.AddScoped<ITranslateService, LibreTranslateService>();
services.SetupCookieAuth();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MigrateDBWhenNecessary<MainDbContext>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
