using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class FavoriteTranslation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Favourite",
                table: "Dictionary",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favourite",
                table: "Dictionary");
        }
    }
}
