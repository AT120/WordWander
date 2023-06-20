
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Controllers;

[Route("api/users/")]
[ApiController]
[Authorize]
public class UserController : Controller
{
    private readonly IGroupService _groupService;
    private readonly IInvitationService _invitationService;
    public UserController(IGroupService groupService, IInvitationService invitationService)
    {
        _groupService = groupService;
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

    [HttpGet("groups")]
    public async Task<ActionResult<GroupPageDTO>> GetUsersGroups()
    {
        try
        {
            var groups = await _groupService.GetAllGroups(ClaimsManager.GetIdClaim(User), false);
            return groups;
        }
        catch (BackendException be)
        {
            return Problem(be.UserMessage, statusCode: be.StatusCode);
        }
        catch
        {
            return Problem("Uknown server error", statusCode: 500);
        }
    }
}