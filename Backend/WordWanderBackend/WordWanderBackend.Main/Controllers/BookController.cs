
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.DAL.Migrations;

namespace WordWanderBackend.Main.Controllers;

[Route("api/books/")]
[ApiController]
[Authorize]
public class BookController : Controller
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet("{id}/file")]
    public async Task<IActionResult> GetBookById(Guid id)
    {
        try
        {
            var file = await _bookService.GetBookFile(id, ClaimsManager.GetIdClaim(User));
            return new FileStreamResult(file, "application/octet-stream");
        }
        catch (BackendException be)
        {
            return Problem(be.UserMessage, statusCode: be.StatusCode);
        }
        catch
        {
            return Problem("Unknown server error", statusCode: 501);
        }
    }


    [HttpPut("{id}/progress")]
    public async Task<ActionResult> UpdateProgress(Guid id, BookProgressDTO progress)
    {
        try
        {
            await _bookService.UpdateProgress(id, ClaimsManager.GetIdClaim(User), progress.PercentReaded);
            return Ok();
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

    [HttpPut("{id}/languages")]
    public async Task<ActionResult> UpdateLanguages(Guid id, LanguagesDTO languages)
    {
        try
        {
            await _bookService.SetBookLanguages(
                id,
                ClaimsManager.GetIdClaim(User),
                languages.SourceLangCode,
                languages.TargetLangCode);
                
            return Ok();
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

    [HttpGet("{id}/parameters")]
    public async Task<ActionResult<ReaderParametersDTO>> GetParameters(Guid id)
    {

        try
        {
            var parameters = await _bookService.GetReaderParameters(
                id,
                ClaimsManager.GetIdClaim(User));
            return parameters;
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