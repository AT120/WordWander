using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Const;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Controllers;

[Authorize]
[ApiController]
[Route("/api/translate")]
public class TranslateController : Controller
{
    private readonly ITranslateService _translateService;

    public TranslateController(ITranslateService ts)
    {
        _translateService = ts;
    }

    [HttpGet("detect")]
    public async Task<ActionResult<LanguageDTO>> DetectLanguage(string text)
    {
        try
        {
            string lang = await _translateService.DetectLanguage(text);
            return new LanguageDTO { Language = lang };
        }
        catch (BackendException be)
        {
            return Problem(be.UserMessage, statusCode: be.StatusCode);
        }
        catch
        {
            return Problem("Unknown server error", statusCode: 500);
        }
    }

    [HttpPost]
    public async Task<ActionResult<TranslatedText>> Translate(TranslateQueryDTO query)
    {
        try
        {
            string text = await _translateService.Translate(query.Q, query.Source, query.Target);
            return new  TranslatedText { Text = text };
        }
        catch (BackendException be)
        {
            return Problem(be.UserMessage, statusCode: be.StatusCode);
        }
        catch
        {
            return Problem("Unknown server error", statusCode: 500);
        }
    }
}