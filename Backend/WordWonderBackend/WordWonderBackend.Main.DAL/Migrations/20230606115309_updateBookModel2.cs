using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWonderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateBookModel2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentPage",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PageCount",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentPage",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PageCount",
                table: "Books");
        }
    }
}
