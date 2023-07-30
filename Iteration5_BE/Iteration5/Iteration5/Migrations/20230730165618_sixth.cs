using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Iteration5.Migrations
{
    /// <inheritdoc />
    public partial class sixth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Video",
                table: "HelpTips");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "HelpTips",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
