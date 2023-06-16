using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class DictionaryNameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TranslatedLangaugeCode",
                table: "Dictionary",
                newName: "TranslatedLangauge");

            migrationBuilder.RenameColumn(
                name: "DefaultLanguageCode",
                table: "Dictionary",
                newName: "DefaultLanguage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TranslatedLangauge",
                table: "Dictionary",
                newName: "TranslatedLangaugeCode");

            migrationBuilder.RenameColumn(
                name: "DefaultLanguage",
                table: "Dictionary",
                newName: "DefaultLanguageCode");
        }
    }
}
