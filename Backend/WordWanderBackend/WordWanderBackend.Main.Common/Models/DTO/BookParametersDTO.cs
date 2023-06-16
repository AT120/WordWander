namespace WordWanderBackend.Main.Common.Models.DTO;

public class BookParametersDTO
{
    public string? SourceLang { get; set; }
    public string? TargetLang { get; set; }
    public double PercentProgress { get; set; }
}