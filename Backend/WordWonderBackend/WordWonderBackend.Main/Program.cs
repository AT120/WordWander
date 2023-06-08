using Microsoft.EntityFrameworkCore;
using WordWonderBackend.Main.BL.Services;
using WordWonderBackend.Main.Common.Interfaces;
using WordWonderBackend.Main.Common.Models.Settings;
using WordWonderBackend.Main.DAL;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

string connection = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new NullReferenceException("Specify connection string!");

services.AddDbContext<MainDbContext>(options => options.UseNpgsql(connection));
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var storageString = "Storage";
services.Configure<StorageSettings>(builder.Configuration.GetSection(storageString));
services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});
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
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
