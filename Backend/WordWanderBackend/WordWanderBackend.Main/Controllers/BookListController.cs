using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.Enums;
using System.Web;
using WordWanderBackend.Main.BL.Statics;

namespace WordWonderBackend.Main.Controllers
{
    [Route("api/books/")]
    [ApiController]
    public class BookListController : Controller
    {
        private readonly IBookListService _bookListService;
        public BookListController(IBookListService bookListService) {
            _bookListService = bookListService;
        }
        [Authorize]
        [HttpGet("{page}")]
        public async Task<IActionResult> GetUserBooks(int page, BookSortParam? sortedBy, string name = "")
        {
            try
            {
                
                var books = await _bookListService.GetUserBooks(page, name, ClaimsManager.GetIdClaim(User), sortedBy);
                return Ok(books);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> PostBook(IFormFile file, string title, string description="")
        {
            try
            {
                var cookie = Request.Cookies[".AspNetCore.Cookies"];
                Console.WriteLine(cookie);
                await _bookListService.PostBookToList(file, title, description, ClaimsManager.GetIdClaim(User));
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, statusCode: 501);
            }
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            try
            {
                await _bookListService.DeleteBookFromList(id, ClaimsManager.GetIdClaim(User));
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}