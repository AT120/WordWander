using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Models.Enums;

namespace WordWanderBackend.Main.DAL.Models
{
	public class DictionaryDbModel
	{

	public Guid Id { get; set; }
	public DateTime CreationDate { get; set; }
	public string DefaultLanguage { get; set; }
	public string DefaultSequnce { get; set; }
	public string? TranslatedSequence { get; set; }
	public string TranslatedLangauge { get; set; }


		//#Relationships

		public UserDbModel User { get; set; }
		public BookDbModel? Book { get; set; }


	}
}
