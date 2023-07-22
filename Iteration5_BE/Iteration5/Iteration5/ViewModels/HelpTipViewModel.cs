namespace Iteration5.ViewModels
{
    public class HelpTipViewModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? Video { get; set; }

        public HelpTipViewModel(string name, string description, string date, string video)
        {
            Name = name;
            Description = description;
            Date = date;
            Video = video;
        }

        public HelpTipViewModel()
        {

        }
    }
}
