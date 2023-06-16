using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Settings;

namespace WordWanderBackend.Main.BL.Services;



public class LibreTranslateService : ITranslateService
{
    private class LanguageDetection
    {
        public float Confidence { get; set; }
        public string Language { get; set; }
    }

    private class LanguageDetectResponse
    {
        public ICollection<LanguageDetection> Detections;
    }

    private class TranslateResponse
    {
        public string TranslatedText { get; set; }
    }


    private readonly LibreTranslateSettings _settings;
    private readonly HttpClient _httpClient;
    public LibreTranslateService(IOptions<LibreTranslateSettings> settings)
    {
        _settings = settings.Value;
        _httpClient = new() { BaseAddress = new Uri(_settings.LibreTranslateApiUrl) };
    }


    public async Task<string> DetectLanguage(string text)
    {
        var resp = await _httpClient.PostAsJsonAsync("detect", new TranslateQueryDTO { Q = text });
        if (!resp.IsSuccessStatusCode)
            throw new BackendException((int)resp.StatusCode, resp.ReasonPhrase);

        var detection = await resp.Content.ReadFromJsonAsync<LanguageDetectResponse>();

        return detection?.Detections.FirstOrDefault()?.Language
            ?? throw new BackendException(500, "Internal api parsing error");
    }

    public async Task<string> Translate(string text, string sourceLang, string targetLang)
    {
        var resp = await _httpClient.PostAsJsonAsync("translate", new TranslateQueryDTO
        {
            Q = text,
            Source = sourceLang,
            Target = targetLang
        });

        if (!resp.IsSuccessStatusCode)
            throw new BackendException((int)resp.StatusCode, resp.ReasonPhrase);

        var detection = await resp.Content.ReadFromJsonAsync<TranslateResponse>()
            ?? throw new BackendException(500, "Internal api parsing error");

        return detection.TranslatedText;
    }
}