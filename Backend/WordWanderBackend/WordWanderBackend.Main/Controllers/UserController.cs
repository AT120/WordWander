
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;

namespace WordWanderBackend.Main.Controllers;

[Route("api/users/")]
[ApiController]
[Authorize]
public class UserController : Controller
{
    private readonly IBookService _bookService;
    private readonly IInvitationService _invitationService;
    public UserController(IBookService bookService, IInvitationService invitationService)
    {
        _bookService = bookService;
        _invitationService = invitationService;
    }
    [HttpGet("invitations")]
    public async Task<IActionResult> GetInvintations()
    {
        try
        {
            var invintations = await _invitationService.GetInvintations(ClaimsManager.GetIdClaim(User));
            return Ok(invintations);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message, statusCode: 501);
        }
    }
    [HttpPost("invitation/{invitationId}/{accept}")]
    public async Task<IActionResult> GetUsersByNameToInvite(Guid invitationId, bool accept)
    {
        try
        {
            await _invitationService.AcceptOrDeclineInvitation(invitationId, ClaimsManager.GetIdClaim(User), accept);
            return Ok();
        }
        catch (ArgumentNullException ex)
        {
            return Problem(ex.Message, statusCode: 404);
        }
        catch (ArgumentException ex)
        {
            return Problem(ex.Message, statusCode: 403);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message, statusCode: 501);

        }
    }
}