using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService aus)
    {
        _authService = aus;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(UserRegisterCredsDTO creds)
    {
        try
        {
            await _authService.Register(
                creds.UserName,
                creds.Password,
                creds.Role ?? Role.Student,
                HttpContext);
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

    [HttpPost("login")]
    public async Task<ActionResult> Login(UserCredsDTO creds)
    {
        try
        {
            await _authService.Login(creds.UserName, creds.Password, HttpContext);
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


    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        try
        {
            await _authService.Logout(HttpContext);
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
    [HttpGet("authorized")]
    [Authorize]
    public async Task<IActionResult> CheckIfAuthorized()
    {
        return Ok(ClaimsManager.GetRoleClaim(User));
    }


}