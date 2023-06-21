namespace WordWanderBackend.Main.Common.Models.DTO
{
    public class TranslationToSaveDTO
	{
		public Guid? BookId { get; set; }
		public string DefaultLanguage { get; set; }
		public string DefaultSequence { get; set; }
		public string TranslatedLanguage { get; set; }
		public string? TranslatedSequence { get; set; }
		
		
	}
}
