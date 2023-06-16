namespace WordWanderBackend.Main.Common.Interfaces;

public interface IBookService
{
    Task<FileStream> GetBookFile(Guid id, Guid userId);
    Task UpdateProgress(Guid bookId, Guid userId, double PercentReaded);
    Task SetBookLanguages(Guid bookId, Guid userId, string? sourceLang, string? targetLang);
}