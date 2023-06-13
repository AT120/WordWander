using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class changePagesToPercents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentPage",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PageCount",
                table: "Books");

            migrationBuilder.AddColumn<float>(
                name: "CurrentPercent",
                table: "Books",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentPercent",
                table: "Books");

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
    }
}
