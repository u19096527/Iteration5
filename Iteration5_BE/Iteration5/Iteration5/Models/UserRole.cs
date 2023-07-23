using System.ComponentModel.DataAnnotations;

namespace Iteration5.Models
{
    public class UserRole
    {
        [Key]
        public int UserRole_ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
