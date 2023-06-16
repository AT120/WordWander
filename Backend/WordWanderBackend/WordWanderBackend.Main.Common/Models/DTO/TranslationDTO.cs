using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.DTO
{
	public class TranslationDto
	{
		public Guid TranslationId { get; set; }
		public Guid BookId { get; set; }
		public string DefaultLanguage { get; set; }
		public string DefaultSequnce { get; set; }
		public string TranslatedLangauge { get; set; }
		public string? TranslatedSequence { get; set; }
	}
}
