﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.Enums
{
    public static class Languages
    {
        public static IReadOnlyDictionary<string, string> LanguageDictionary { get;  private set; }
            = new Dictionary<string, string>
        {
            {"en","English"},
            {"ru","Russian"},
            {"ar","Arabic"},
            {"az","Azerbaijani"},
            {"ca","Catalan"},
            {"zh","Chinese"},
            {"cs","Czech"},
            {"da","Danish"},
            {"nl","Dutch"},
            {"eo","Esperanto"},
            {"fi","Finnish"},
            {"fr","French"},
            {"de","German"},
            {"el","Greek"},
            {"he","Hebrew"},
            {"hi","Hindi"},
            {"hu","Hungarian"},
            {"id","Indonesian"},
            {"ga","Irish"},
            {"it","Italian"},
            {"ja","Japanese"},
            {"ko","Korean"},
            {"fa","Persian"},
            {"pl","Polish"},
            {"pt","Portuguese"},
            {"sk","Slovak"},
            {"es","Spanish"},
            {"sv","Swedish"},
            {"th","Thai"},
            {"tr","Turkish"},
            {"uk","Ukranian"},
        };

        public static LanguageInfo[] languages = new LanguageInfo[] {
            new LanguageInfo("en","English"),
            new LanguageInfo("ru","Russian"),
            new LanguageInfo("ar","Arabic"),
            new LanguageInfo("az","Azerbaijani"),
            new LanguageInfo("ca","Catalan"),
            new LanguageInfo("zh","Chinese"),
            new LanguageInfo("cs","Czech"),
            new LanguageInfo("da","Danish"),
            new LanguageInfo("nl","Dutch"),
            new LanguageInfo("eo","Esperanto"),
            new LanguageInfo("fi","Finnish"),
            new LanguageInfo("fr","French"),
            new LanguageInfo("de","German"),
            new LanguageInfo("el","Greek"),
            new LanguageInfo("he","Hebrew"),
            new LanguageInfo("hi","Hindi"),
            new LanguageInfo("hu","Hungarian"),
            new LanguageInfo("id","Indonesian"),
            new LanguageInfo("ga","Irish"),
            new LanguageInfo("it","Italian"),
            new LanguageInfo("ja","Japanese"),
            new LanguageInfo("ko","Korean"),
            new LanguageInfo("fa","Persian"),
            new LanguageInfo("pl","Polish"),
            new LanguageInfo("pt","Portuguese"),
            new LanguageInfo("sk","Slovak"),
            new LanguageInfo("es","Spanish"),
            new LanguageInfo("sv","Swedish"),
            new LanguageInfo("th","Thai"),
            new LanguageInfo("tr","Turkish"),
            new LanguageInfo("uk","Ukranian"),
        };
    }
    public struct LanguageInfo
    {
        public LanguageInfo(string languageCode, string language)
        {
            Language = language;
            LanguageCode = languageCode;
        }
        public string Language;
        public string LanguageCode;
    }

}
