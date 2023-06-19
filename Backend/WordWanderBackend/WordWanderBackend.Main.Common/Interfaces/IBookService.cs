using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Common.Interfaces;

public interface IBookService
{
    Task<FileStream> GetBookFile(Guid id, Guid userId);
    Task UpdateProgress(Guid bookId, Guid userId, double PercentReaded);
    Task<ReaderParametersWithProgress> GetReaderParameters(Guid bookId, Guid userId);
    Task SetReaderParameters(Guid bookId, Guid userId, ReaderParameters parameters);
}