using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;
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
        var book = await _dbcontext.Books.FindAsync(id)
            ?? throw new BackendException(404, $"You have no access to book ${id}");

        if (book.UserId != userId && !await _dbcontext.AnyCommonGroup(book.UserId, userId))
            throw new BackendException(404, $"You have no access to book ${id}");


        var filePath = Path.Combine(_storageSettings.FolderPath, book.Id.ToString() + book.Extension);

        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }


    public async Task<ReaderParametersWithProgress> GetReaderParameters(Guid bookId, Guid userId)
    {
        var user = await _dbcontext.Users.FindAsync(userId)
            ?? throw new BackendException(403, "User does not exist");

        var book = await _dbcontext.Books.FindAsync(bookId);

        if (book == null || book.UserId != userId)
            throw new BackendException(404, "Book does not exist");

        return new ReaderParametersWithProgress
        {
            ColorTheme = user.PrefferedColorTheme,
            FontSize = user.PrefferedFontSize,
            ReadingProgress = book.CurrentPercent,
            SourceLanguage = book.SourceLanguageCode,
            TargetLanguage = book.TargetLanguageCode,
            TranslationApi = user.PrefferedApi
        };
    }

    public async Task SetReaderParameters(Guid bookId, Guid userId, ReaderParameters parameters)
    {
        var user = await _dbcontext.Users.FindAsync(userId)
            ?? throw new BackendException(403, "User does not exist");

        var book = await _dbcontext.Books.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == bookId)
            ?? throw new BackendException(404, $"Book does not exist");
        
        if (parameters.SourceLanguage != null) {
            if (!Languages.LanguageDictionary.ContainsKey(parameters.SourceLanguage))
                throw new BackendException(400, $"{parameters.SourceLanguage} is not a valid language code");
            book.SourceLanguageCode = parameters.SourceLanguage;
        }
        if (parameters.TargetLanguage != null) {
            if (!Languages.LanguageDictionary.ContainsKey(parameters.TargetLanguage))
                throw new BackendException(400, $"{parameters.TargetLanguage} is not a valid language code");
            book.TargetLanguageCode = parameters.TargetLanguage;
        }
        
        user.PrefferedApi = parameters.TranslationApi;
        user.PrefferedColorTheme = parameters.ColorTheme;
        user.PrefferedFontSize = parameters.FontSize;

        await _dbcontext.SaveChangesAsync();
    }

    public async Task SetBookLastTimeOpening(Guid bookId, Guid userId)
    {
        var book = await _dbcontext.Books.FirstOrDefaultAsync(x => x.Id== bookId);
        if (book == null)
        {
            throw new ArgumentNullException($"There is no book with this {bookId} id!");
        }
        if (book.UserId != userId)
        {
            throw new InvalidOperationException($"You can't edit book with this {bookId} id");
        }
        book.LastOpeningTime= DateTime.UtcNow;
        await _dbcontext.SaveChangesAsync();
    }
}