using Microsoft.AspNetCore.Mvc;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Controllers
{
    [Route("api/books/")]
    [ApiController]
    public class BookListController : Controller
    {
        private readonly IBookListService _bookListService;
        public BookListController(IBookListService bookListService) {
         _bookListService= bookListService;
        }
        [HttpGet("{page}")]
        public async Task<IActionResult> GetUserBooks(int page, BookSortParam? sortedBy, string name="")
        {
            try
            {
                var books = await _bookListService.GetUserBooks(page, name, new Guid(), sortedBy);
                return Ok(books);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add")]
        public async Task<IActionResult> PostBook (IFormFile file, string title, string description) 
        {
            try
            {
                await _bookListService.PostBookToList(file, title, description);
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem (ex.Message, statusCode:501);
            }
        }
    }
}
