
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordWanderBackend.Main.Common.Interfaces;

namespace WordWanderBackend.Main.Controllers;

[Route("api/users/")]
[ApiController]
[Authorize]
public class UserController : Controller
{
    private readonly IBookService _bookService;

    public UserController(IBookService bookService)
    {
        _bookService = bookService;
    }

}