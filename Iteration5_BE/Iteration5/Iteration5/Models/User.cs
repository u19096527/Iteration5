using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Iteration5.Models
{
    public class User
    {
        [Key]
        public int User_Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public int UserRole_ID { get; set; }

    }
}
