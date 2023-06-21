namespace WordWanderBackend.Main.Common.Models.DTO;

public class ShortTranslationDTO
{
    public Guid Id { get; set; }
    public string OriginalString { get; set; }
    public string TranslatedString { get; set; }
}