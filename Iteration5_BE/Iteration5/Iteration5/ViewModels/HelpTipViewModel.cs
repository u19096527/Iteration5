namespace Iteration5.ViewModels
{
    public class HelpTipViewModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? Video { get; set; } = string.Empty;
        public string? FilePath { get; set; } = string.Empty;
        public string? FileName { get; set; } = string.Empty;
        public IFormFile VideoFile { get; set; }

        public HelpTipViewModel(string name, string description, string date, string video, string filePath, string fileName, IFormFile videoFile)
        {
            Name = name;
            Description = description;
            Date = date;
            Video = video;
            FilePath = filePath;
            FileName = fileName;
            VideoFile = videoFile;
        }

        public HelpTipViewModel()
        {

        }
    }
}
