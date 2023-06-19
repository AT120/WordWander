using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.DTO
{
	public class TranslationCollectonDTO
	{
		public ICollection<TranslationDto> translationDtos { get; set; }
	}
}
