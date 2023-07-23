namespace Iteration5.Models
{
    public interface IUserRoleRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<UserRole[]> GetAllUserRolesAsync();
        Task<UserRole> GetAUserRoleAsync(int UserRole_ID);
        Task<UserRole[]> GetSearchedUserRoleAsync(string enteredQuery);
        Task<bool> SaveChangesAsync();

    }
}
