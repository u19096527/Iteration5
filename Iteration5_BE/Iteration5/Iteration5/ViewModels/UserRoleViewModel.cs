namespace Iteration5.ViewModels
{
    public class UserRoleViewModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public UserRoleViewModel(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
