using Microsoft.EntityFrameworkCore;
using WordWonderBackend.Main.BL.Services;
using WordWonderBackend.Main.Common.Interfaces;
using WordWonderBackend.Main.DAL;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

string connection = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new NullReferenceException("Specify connection string!");
services.AddDbContext<MainDbContext>(options => options.UseNpgsql(connection));

services.AddControllers();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddScoped<IBookListService, BookListService>();
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
