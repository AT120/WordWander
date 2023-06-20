using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordWanderBackend.Main.BL.Statics;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Controllers
{
    [Route("api/dictionary/")]
    [ApiController]
    public class DictionaryController : Controller
    {
        private readonly IDictionaryTranslationService _dictionaryService;
        public DictionaryController(IDictionaryTranslationService dictionaryService)
        {
            _dictionaryService = dictionaryService;
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult<Guid>> SaveTranslationToDictionary(TranslationToSaveDTO model)
        {
            try
            {
                return await _dictionaryService.SaveTranslationToDictionary(
                    model.BookId,
                    ClaimsManager.GetIdClaim(User),
                    model.DefaultLanguage,
                    model.DefaultSequence,
                    model.TranslatedSequence,
                    model.TranslatedLanguage);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, statusCode: 501);
            }
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<TranslationCollectonDTO>> GetDictionary()
        {
            try
            {

				var dictionary = await _dictionaryService.GetDictionary(ClaimsManager.GetIdClaim(User));
				return Ok(dictionary);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize]
        [HttpGet("books/{bookId}")]
        public async Task<ActionResult<ShortTranslationCollectionDTO>> GetBookDictionary(Guid bookId)
        {
            try
            {
                var dictionary = await _dictionaryService.GetShortTranslations(
                    bookId,
                    ClaimsManager.GetIdClaim(User));

                return new ShortTranslationCollectionDTO { Dictionary = dictionary };
            }
            catch
            {
                return Problem("Unknown server error", statusCode: 500);
            }
        }

        [Authorize]
        [HttpDelete("delete/{translationId}")]
        public async Task<IActionResult> DeleteTranslation(Guid translationId)
        {
            try
            {
                await _dictionaryService.DeleteTranslation(translationId, ClaimsManager.GetIdClaim(User));
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

		[Authorize]
		[HttpPut("favorite/{translationId}")]
		public async Task<IActionResult> ChangeTranslationFavoriteStatus(Guid translationId)
		{
			try
			{
				await _dictionaryService.ChangeTranslationFavoriteStatus(translationId, ClaimsManager.GetIdClaim(User));
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize]
		[HttpPut("edit/{translationId}")]
		public async Task<IActionResult> EditTranslation(Guid translationId, TranslationToSaveDTO model)
		{
			try
			{
				await _dictionaryService.EditTranslation(
                    translationId,
                    model.BookId,
                    ClaimsManager.GetIdClaim(User),
                    model.DefaultLanguage,
                    model.DefaultSequence,
                    model.TranslatedSequence,
                    model.TranslatedLanguage);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}




    }
}
