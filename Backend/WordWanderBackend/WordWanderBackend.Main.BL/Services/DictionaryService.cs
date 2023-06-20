using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;
using WordWanderBackend.Main.Common.Models.Settings;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Services
{
    public class DictionaryService : IDictionaryTranslationService
    {
        private readonly MainDbContext _context;
        public DictionaryService(MainDbContext context, IOptions<StorageSettings> storageSettings)
        {
            _context = context;
        }
        public async Task<Guid> SaveTranslationToDictionary(Guid bookId, Guid userId, string DefaultLanguage, string DefaultSequnce, string TranslatedSequence, string TranslatedLangauge)
        {
            var book = await _context.Books.FindAsync(bookId)
                ?? throw new ArgumentException($"There is no book with this {bookId} id!");
            var user = await _context.Users.FindAsync(userId);
            //Check if user have book with such bookId
            if (book.UserId != userId)
            {
                throw new ArgumentException($"The user doesn't have a book with this {bookId} id!");
            }

            if (!Languages.LanguageDictionary.ContainsKey(DefaultLanguage))
            {
                throw new ArgumentException($"There is no such language code as {DefaultLanguage} !");
            }

            if (!Languages.LanguageDictionary.ContainsKey(TranslatedLangauge))
            {
                throw new ArgumentException($"There is no such language code as {TranslatedLangauge} !");
            }

            var dictionary = new DictionaryDbModel
            {
                Book = book,
                CreationDate = DateTime.UtcNow,
                DefaultLanguage = Languages.LanguageDictionary[DefaultLanguage],
                DefaultSequnce = DefaultSequnce,
                TranslatedSequence = TranslatedSequence,
                TranslatedLanguage = Languages.LanguageDictionary[TranslatedLangauge],
                Favourite = false,
                User = user
            };

            await _context.Dictionary.AddAsync(dictionary);
            await _context.SaveChangesAsync();
            return dictionary.Id;
        }

        public async Task DeleteTranslation(Guid TranslationId, Guid userId)
        {
            var translation = await _context.Dictionary.FirstOrDefaultAsync(d => d.Id.Equals(TranslationId) && d.User.Id.Equals(userId));
            if (translation == null)
            {
                throw new ArgumentException($"There is no translation with this {TranslationId} id!");
            }
            _context.Dictionary.Remove(translation);
            await _context.SaveChangesAsync();
        }


        public async Task<TranslationCollectonDTO> GetDictionary(Guid userId)
        {

            //TODO: Добавить сортировку dictionary Favourite true/false

            List<TranslationDto>? tranlations = await _context.Dictionary.Where(d => d.User.Id.Equals(userId)).Include(d => d.Book).OrderByDescending(d => d.CreationDate).OrderByDescending(d => d.Favourite).Select(d => new TranslationDto
            {
                DefaultLanguage = d.DefaultLanguage,
                DefaultSequnce = d.DefaultSequnce,
                TranslatedSequence = d.TranslatedSequence,
                TranslatedLangauge = d.TranslatedLanguage,
                TranslationId = d.Id,
                BookId = d.Book.Id,
                BookTitle = d.Book.Name,
                Created = d.CreationDate,
                Favourite = d.Favourite,

            }).ToListAsync();

            TranslationCollectonDTO dictionary = new TranslationCollectonDTO { translationDtos = tranlations };

            return dictionary;

        }

        public async Task<IEnumerable<ShortTranslationDTO>> GetShortTranslations(Guid bookId, Guid userId)
        {
            var translations = await _context.Dictionary
                .Where(d => d.User.Id == userId && d.Book.Id == bookId)
                .Select(d => new ShortTranslationDTO
                {
                    Id = d.Id,
                    OriginalString = d.DefaultSequnce,
                    TranslatedString = d.TranslatedSequence
                }).ToListAsync();

            return translations;
        }
		
        public async Task ChangeTranslationFavoriteStatus(Guid TranslationId, Guid userId)
        {
            var translation = await _context.Dictionary.FirstOrDefaultAsync(d => d.Id.Equals(TranslationId) && d.User.Id.Equals(userId));
            if (translation == null)
            {
                throw new ArgumentException($"There is no translation with this {TranslationId} id!");
            }
            translation.Favourite = !translation.Favourite;
            await _context.SaveChangesAsync();
        }

        public async Task EditTranslation(Guid TranslationId, Guid bookId, Guid userId, string DefaultLanguage, string DefaultSequnce, string TranslatedSequence, string TranslatedLangauge)
        {
            var translation = await _context.Dictionary.FirstOrDefaultAsync(d => d.Id.Equals(TranslationId) && d.User.Id.Equals(userId));

            if (translation == null)
            {
                throw new ArgumentException($"There is no translation with this {TranslationId} id!");
            }

            if (!await _context.Books.AnyAsync(b => b.Id.Equals(bookId) && b.UserId.Equals(userId)))
            {
                throw new ArgumentException($"The user doesn't have a book with this {bookId} id!");
            }

            if (!Languages.languages.Any(l => l.Language.Equals(DefaultLanguage)))
            {
                throw new ArgumentException($"There is no such language as  {DefaultLanguage} !");
            }

            if (!Languages.languages.Any(l => l.Language.Equals(TranslatedLangauge)))
            {
                throw new ArgumentException($"There is no such language as  {TranslatedLangauge} !");
            }

            var book = await _context.Books.FindAsync(bookId);

            if (book == null)
            {
                throw new ArgumentException($"There is no book with this {bookId} id!");
            }

            translation.DefaultLanguage = DefaultLanguage;
            translation.DefaultSequnce = DefaultSequnce;
            translation.TranslatedSequence = TranslatedSequence;
            translation.TranslatedLanguage = TranslatedLangauge;
            translation.Book = book;
            translation.CreationDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();


        }

    }
}
