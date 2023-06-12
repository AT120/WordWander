namespace WordWanderBackend.Main.Common.Interfaces;

public interface ITranslateService
{
    Task<string> DetectLanguage(string text);
    Task<string> Translate(string text, string sourceLang, string targetLang);
}