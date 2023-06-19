using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;

namespace WordWanderBackend.Main.Controllers
{
    [Route("api/teacher/")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IInvitationService _invitationService;
        public TeacherController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }
        [Authorize]
        [HttpPost("invitations/{groupId}/{invitedId}")]
        public async Task<IActionResult> SendInvintation(Guid groupId, Guid invitedId)
        {
            try
            {
                 await _invitationService.SendInvite(ClaimsManager.GetIdClaim(User), invitedId, groupId);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                return Problem(ex.Message, statusCode:404);
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
        [Authorize]
        [HttpGet("get/{name}/{groupId}")]
        public async Task<IActionResult> GetUsersByNameToInvite(string name, Guid groupId)
        {
            try
            {
                var users = await _invitationService.GetUsersForInvite(name, ClaimsManager.GetIdClaim(User), groupId);
                return Ok(users);
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
}
