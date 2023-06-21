using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
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
services.Configure<LibreTranslateSettings>(builder.Configuration.GetSection("ConnectionStrings"));

services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy => policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins(builder.Configuration["ClientOrigin"])
    );
});
builder.AddDB<MainDbContext>("DbConnection");
services.AddControllers();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddScoped<IBookListService, BookListService>();
services.AddScoped<IDictionaryTranslationService, DictionaryService>();
services.AddTransient<IPasswordHasher<UserDbModel>, PasswordHasher<UserDbModel>>();
services.AddScoped<IAuthService, AuthService>();
services.AddScoped<ITranslateService, LibreTranslateService>();
services.AddScoped<IBookService, BookService>();
services.AddScoped<IInvitationService, InvitationService>();
services.AddScoped<IGroupService, GroupService>();
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
