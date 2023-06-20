namespace WordWanderBackend.Main.Common.Models.DTO;

public class GroupPageDTO
{
    public int TotalPages { get; set; }
    public IEnumerable<GroupShortDTO> Groups { get; set; }
}