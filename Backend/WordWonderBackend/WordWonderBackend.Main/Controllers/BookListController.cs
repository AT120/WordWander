using Microsoft.AspNetCore.Mvc;
using WordWonderBackend.Main.Common.Interfaces;
using WordWonderBackend.Main.Common.Models.Enums;

namespace WordWonderBackend.Main.Controllers
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
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
