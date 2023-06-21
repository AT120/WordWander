namespace WordWanderBackend.Main.DAL.Models;

public class StudentGroupDbModel
{
    public Guid UserId { get; set; }
    public UserDbModel User { get; set; }
    public Guid GroupId { get; set; }
    public GroupDbModel Group { get; set; }
}