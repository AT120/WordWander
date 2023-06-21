using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    /// <inheritdoc />
    public partial class inviteFunctional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    TeacherId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Groups_Users_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupStudents",
                columns: table => new
                {
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserGroupsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupStudents", x => new { x.StudentsId, x.UserGroupsId });
                    table.ForeignKey(
                        name: "FK_GroupStudents_Groups_UserGroupsId",
                        column: x => x.UserGroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupStudents_Users_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    InvitedId = table.Column<Guid>(type: "uuid", nullable: false),
                    InviterId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invations_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invations_Users_InvitedId",
                        column: x => x.InvitedId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invations_Users_InviterId",
                        column: x => x.InviterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Groups_TeacherId",
                table: "Groups",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupStudents_UserGroupsId",
                table: "GroupStudents",
                column: "UserGroupsId");

            migrationBuilder.CreateIndex(
                name: "IX_Invations_GroupId",
                table: "Invations",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Invations_InvitedId",
                table: "Invations",
                column: "InvitedId");

            migrationBuilder.CreateIndex(
                name: "IX_Invations_InviterId",
                table: "Invations",
                column: "InviterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupStudents");

            migrationBuilder.DropTable(
                name: "Invations");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
