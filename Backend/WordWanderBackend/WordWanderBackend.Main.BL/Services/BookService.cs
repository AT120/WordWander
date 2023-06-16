using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.Settings;
using WordWanderBackend.Main.DAL;

namespace WordWanderBackend.Main.BL.Services;

public class BookService : IBookService
{
    private readonly MainDbContext _context;
    private readonly StorageSettings _storageSettings;

    public BookService(MainDbContext context, IOptions<StorageSettings> storageSettings)
    {
        _context = context;
        _storageSettings = storageSettings.Value;
    }

    public async Task UpdateProgress(Guid bookId, Guid userId, double PercentReaded)
    {
        BackendException NotFound = new(404, "Requested book was not found");
        var book = await _context.Books.FindAsync(bookId)
            ?? throw NotFound;

        if (book.UserId != userId)
            throw NotFound;

        book.CurrentPercent = PercentReaded;
        await _context.SaveChangesAsync();
    }


    public async Task<FileStream> GetBookFile(Guid id, Guid userId)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == id)
            ?? throw new BackendException(404, $"This user {userId} haven't got book with this {id} id!");

        var filePath = Path.Combine(_storageSettings.FolderPath, book.Id.ToString() + book.Extension);

        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }

    public async Task SetBookLanguages(Guid bookId, Guid userId, string? sourceLang, string? targetLang)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == bookId)
            ?? throw new BackendException(404, $"User {userId} does not have book with {bookId} id");
        
        //TODO: check language existence
        if (sourceLang != null)
            book.SourceLanguageCode = sourceLang;
        if (targetLang != null)
            book.TargetLanguageCode = targetLang;

        await _context.SaveChangesAsync();
    }
}