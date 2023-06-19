using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Common.Models.DTO;

public class ReaderParameters
{
    public string? SourceLanguage { get; set; }
    public string? TargetLanguage { get; set; }
    public ColorTheme ColorTheme { get; set; }
    public int FontSize { get; set; }
    public TranslationApi TranslationApi { get; set; }
}