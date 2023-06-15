namespace WordWanderBackend.Main.Common.Interfaces;

public  interface IBookService
{
    Task UpdateProgress(Guid bookId, Guid userId, double PercentReaded);
}