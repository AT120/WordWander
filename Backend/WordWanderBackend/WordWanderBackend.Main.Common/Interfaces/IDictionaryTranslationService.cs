using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Common.Interfaces
{
	public interface IDictionaryTranslationService
	{
		Task<Guid> SaveTranslationToDictionary(Guid bookId, Guid userId, string DefaultLanguageCode, string DefaultSequnce, string TranslatedSequence, string TranslatedLangaugeCode);
		Task<TranslationCollectonDTO> GetDictionary(Guid userId);
		Task DeleteTranslation(Guid TranslationId, Guid userId);
		Task<IEnumerable<ShortTranslationDTO>> GetShortTranslations(Guid bookId, Guid userId);
	}
}
