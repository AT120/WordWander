using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.Controllers
{
    [Route("api/teacher/")]
    [ApiController]
    [Authorize(Roles = "Teacher")]
    public class TeacherController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IInvitationService _invitationService;
        private readonly IBookService _bookService;
        private readonly IBookListService _bookListService;
        private readonly IDictionaryTranslationService _dictionaryService;
        public TeacherController(
            IInvitationService invitationService,
            IGroupService groupService,
            IBookService bookService,
            IBookListService bookListService,
            IDictionaryTranslationService dictionaryService)
        {
            _invitationService = invitationService;
            _groupService = groupService;
            _bookService = bookService;
            _bookListService = bookListService;
            _dictionaryService = dictionaryService;
        }

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

        [HttpGet("groups")]
        public async Task<ActionResult<GroupPageDTO>> GetGroupPage(int page, bool? all)
        {
            try
            {
                if (all.HasValue && all.Value)
                {
                    return await _groupService.GetAllGroups(
                        ClaimsManager.GetIdClaim(User),
                        true
                    );
                }

                return await _groupService.GetGroupPage(
                    page,
                    ClaimsManager.GetIdClaim(User),
                    true
                );
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

        [HttpGet("groups/{groupId}/students")]
        public async Task<ActionResult<GroupUsersDTO>> GetGroupPage(Guid groupId)
        {
            try
            {
                var users = await _groupService.GetGroupUsers(
                    groupId,
                    ClaimsManager.GetIdClaim(User)
                );
                return new GroupUsersDTO { Users = users };
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

        [HttpPost("groups")]
        public async Task<ActionResult> CreateGroup(NameOnly name)
        {
            try
            {
                await _groupService.CreateGroup(
                    name.Name,
                    ClaimsManager.GetIdClaim(User)
                );

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

        [HttpDelete("groups/{groupId}")]
        public async Task<ActionResult> DeleteGroup(Guid groupId)
        {
            try
            {
                await _groupService.DeleteGroup(
                    groupId,
                    ClaimsManager.GetIdClaim(User)
                );

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

        [HttpGet("student/{studentId}/books")]
        public async Task<ActionResult<BooksPaginationDTO>> GetStudentsBooks(
            Guid studentId,
            BookSortParam? sortedBy,
            string name = "")
        {
            try
            {
                var books = await _bookListService.GetUserBooks(
                    null,
                    name,
                    studentId,
                    sortedBy,
                    ClaimsManager.GetIdClaim(User));
                return books;
            }
            catch (BackendException be)
            {
                return Problem(be.UserMessage, statusCode: be.StatusCode);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, statusCode: 500);
            }
        }

        [HttpGet("student/books/{bookId}/file")]
        public async Task<IActionResult> GetStudentBook(Guid bookId)
        {
            try
            {
                var file = await _bookService.GetBookFile(bookId, ClaimsManager.GetIdClaim(User));
                return new FileStreamResult(file, "application/octet-stream");
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

        [HttpGet("student/{studentId}/dictionary")]
        public async Task<ActionResult<TranslationCollectonDTO>> GetStudentsDictionary(Guid studentId)
        {
            try
            {
                var dictionary = await _dictionaryService.GetDictionary(studentId, ClaimsManager.GetIdClaim(User));
                return Ok(dictionary);
            }
            catch (BackendException be)
            {
                return Problem(be.UserMessage, statusCode: be.StatusCode);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("groups/{groupId}/delete/{userId}")]
        public async Task<IActionResult> DeleteUserFromGroup(Guid groupId, Guid userId)
        {
            try
            {
               await _groupService.DeleteStudentFromGroup(ClaimsManager.GetIdClaim(User), groupId, userId);
                return Ok();
            }
            catch(ArgumentNullException ex)
            {
                return Problem(ex.Message,statusCode:404);
            }
            catch(InvalidOperationException ex)
            {
                return Problem(ex.Message, statusCode: 403);
            }
            catch(Exception ex)
            {
                return Problem(ex.Message, statusCode: 500);
            }
        }

    }
}
