
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;

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


    [HttpGet("{id}/parameters")]
    public async Task<ActionResult<ReaderParametersWithProgress>> GetParameters(Guid id)
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

    [HttpPut("{id}/parameters")]
    public async Task<ActionResult> SetParameters(Guid id, ReaderParameters parameters)
    {
        try
        {
            await _bookService.SetReaderParameters(
                id,
                ClaimsManager.GetIdClaim(User),
                parameters);
            
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
    [HttpPut("setTime/{id}")]
    public async Task<IActionResult> SetBootLastOpening(Guid id)
    {
        try
        {
           await _bookService.SetBookLastTimeOpening(id, ClaimsManager.GetIdClaim(User));
            return Ok();
        }
        catch (ArgumentNullException ex) 
        { 
            return Problem(ex.Message,statusCode: 404);
        }
        catch (InvalidOperationException ex)
        {
            return Problem(ex.Message,statusCode: 403);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message,statusCode: 500);
        }
    }
}