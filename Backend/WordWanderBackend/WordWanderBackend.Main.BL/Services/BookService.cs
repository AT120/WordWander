using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.DAL;

namespace WordWanderBackend.Main.BL.Services;

public class BookService : IBookService
{
        private readonly MainDbContext _context;
        public BookService(MainDbContext context)
        {
            _context = context;
        }

    public async Task UpdateProgress(Guid bookId, Guid userId,  double PercentReaded)
    {
        BackendException NotFound = new(404, "Requested book was not found");
        var book = await _context.Books.FindAsync(bookId)
            ?? throw NotFound;
        
        if (book.UserId != userId)
            throw NotFound;
        
        book.CurrentPercent = PercentReaded;
        await _context.SaveChangesAsync();
    }
}