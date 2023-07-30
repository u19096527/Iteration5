using System.ComponentModel.DataAnnotations;

namespace Iteration5.Models
{
    public class HelpTip
    {
        [Key]
        public int Help_ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Date { get; set; }
        //[Required]
        //public string Video { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
    }

    public class FileModel
    {
        public IFormFile ImageFile { get; set; }
    }
}
