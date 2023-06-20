using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class LanguageTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TranslatedLangauge",
                table: "Dictionary",
                newName: "TranslatedLanguage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TranslatedLanguage",
                table: "Dictionary",
                newName: "TranslatedLangauge");
        }
    }
}
