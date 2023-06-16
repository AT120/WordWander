using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;
using WordWanderBackend.Main.Common.Models.Settings;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Services
{
	public class DictionaryService: IDictionaryTranslationService
	{
		private readonly MainDbContext _context;
		public DictionaryService(MainDbContext context, IOptions<StorageSettings> storageSettings)
		{
			_context = context;
		}
		public async Task SaveTranslationToDictionary(Guid bookId , Guid userId,string DefaultLanguage, string DefaultSequnce,string TranslatedSequence, string TranslatedLangauge)
		{
			var book = await _context.Books.FindAsync(bookId);
			
			if (book == null) {
				throw new ArgumentException($"There is no book with this {bookId} id!");
			}
			var user = await _context.Users.FindAsync(userId);
			//Check if user have book with such bookId
			if (!await _context.Books.AnyAsync(b=>b.Id.Equals(bookId)&& b.UserId.Equals(userId)))
			{
				throw new ArgumentException($"The user doesn't have a book with this {bookId} id!");
			}
			/*
			if (!Languages.languages.Any(l => l.Language.Equals(DefaultLanguage)))
			{
				throw new ArgumentException($"There is no such language as  {DefaultLanguage} !");
			}
			//TODO: fix this checks
			if (!Languages.languages.Any(l => l.Language.Equals(TranslatedLangauge)))
			{
				throw new ArgumentException($"There is no such language as  {TranslatedLangauge} !");
			}
			*/
			var dictionary = new DictionaryDbModel
			{
				Book = book,
				CreationDate = DateTime.UtcNow,
				DefaultLanguage = DefaultLanguage,
				DefaultSequnce = DefaultSequnce,
				TranslatedSequence = TranslatedSequence,
				TranslatedLangauge = TranslatedLangauge,
				User = user
			};

			await _context.Dictionary.AddAsync(dictionary);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteTranslation(Guid TranslationId, Guid userId)
		{
			var translation = await _context.Dictionary.FirstOrDefaultAsync(d=>d.Id.Equals(TranslationId) && d.User.Id.Equals(userId));
			if (translation == null)
			{
				throw new ArgumentException($"There is no translation with this {TranslationId} id!");
			}
			_context.Dictionary.Remove(translation);
			await _context.SaveChangesAsync();
		}

		
		public async Task<TranslationCollectonDTO> GetDictionary(Guid userId)
		{

			//TODO: Добавить сортировку dictionary

			List<TranslationDto>? tranlations = await _context.Dictionary.Where(d=>d.User.Id.Equals(userId)).Select(d=> new TranslationDto
			{
				DefaultLanguage=d.DefaultLanguage,
				DefaultSequnce=d.DefaultSequnce,
				TranslatedSequence=d.TranslatedSequence,
				TranslatedLangauge=d.TranslatedLangauge,
				TranslationId=d.Id,
				BookId=d.Book.Id
				
			}).ToListAsync();

			TranslationCollectonDTO dictionary= new TranslationCollectonDTO { translationDtos=tranlations };

			return dictionary;

		}

		

	}
}
