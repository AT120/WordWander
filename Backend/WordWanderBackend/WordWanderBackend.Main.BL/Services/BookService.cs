using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Settings;
using WordWanderBackend.Main.DAL;

namespace WordWanderBackend.Main.BL.Services;

public class BookService : IBookService
{
    private readonly MainDbContext _dbcontext;
    private readonly StorageSettings _storageSettings;

    public BookService(MainDbContext context, IOptions<StorageSettings> storageSettings)
    {
        _dbcontext = context;
        _storageSettings = storageSettings.Value;
    }

    public async Task UpdateProgress(Guid bookId, Guid userId, double PercentReaded)
    {
        BackendException NotFound = new(404, "Requested book was not found");
        var book = await _dbcontext.Books.FindAsync(bookId)
            ?? throw NotFound;

        if (book.UserId != userId)
            throw NotFound;

        book.CurrentPercent = PercentReaded;
        await _dbcontext.SaveChangesAsync();
    }


    public async Task<FileStream> GetBookFile(Guid id, Guid userId)
    {
        var book = await _dbcontext.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == id)
            ?? throw new BackendException(404, $"This user {userId} haven't got book with this {id} id!");

        var filePath = Path.Combine(_storageSettings.FolderPath, book.Id.ToString() + book.Extension);

        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }

    public async Task SetBookLanguages(Guid bookId, Guid userId, string? sourceLang, string? targetLang)
    {
        var book = await _dbcontext.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == bookId)
            ?? throw new BackendException(404, $"User {userId} does not have book with {bookId} id");
        
        //TODO: check language existence
        if (sourceLang != null)
            book.SourceLanguageCode = sourceLang;
        if (targetLang != null)
            book.TargetLanguageCode = targetLang;

        await _dbcontext.SaveChangesAsync();
    }

    public async Task<ReaderParametersDTO> GetReaderParameters(Guid bookId, Guid userId)
    {
        var user = await _dbcontext.Users.FindAsync(userId)
            ?? throw new BackendException(403, "User does not exist");
        
        var book = await _dbcontext.Books.FindAsync(bookId);

        if (book == null || book.UserId != userId)
            throw new BackendException(404, "Book does not exist");
        
        return new ReaderParametersDTO
        {
            ColorTheme = user.PrefferedColorTheme,
            FontSize = user.PrefferedFontSize,
            ReadingProgress = book.CurrentPercent,
            SourceLanguage = book.SourceLanguageCode,
            TargetLanguage = book.TargetLanguageCode,
            TranslationApi = user.PrefferedApi
        };
    }
}