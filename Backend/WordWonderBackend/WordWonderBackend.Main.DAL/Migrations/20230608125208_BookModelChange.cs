using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWonderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class BookModelChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Books");
        }
    }
}
