using Microsoft.EntityFrameworkCore;

namespace Iteration5.Models
{
    public class UserRoleRepository : IUserRoleRepository
    {
            private readonly AppDbContext _appDbContext;

            public UserRoleRepository(AppDbContext appDbContext)
            {
                _appDbContext = appDbContext;
            }

            public void Add<T>(T entity) where T : class
            {
                _appDbContext.Add(entity);
            }
            public void Delete<T>(T entity) where T : class
            {
                _appDbContext.Remove(entity);
            }

            public async Task<UserRole[]> GetAllUserRolesAsync()
            {
                IQueryable<UserRole> query = _appDbContext.UserRoles;
                return await query.ToArrayAsync();
            }

            public async Task<UserRole> GetAUserRoleAsync(int UserRole_ID)
            {
                IQueryable<UserRole> query = _appDbContext.UserRoles.Where(c => c.UserRole_ID == UserRole_ID);
                return await query.FirstOrDefaultAsync();
            }

            public async Task<UserRole[]> GetSearchedUserRoleAsync(string enteredQuery)
            {
                IQueryable<UserRole> query = _appDbContext.UserRoles.Where(c => c.Name.Contains(enteredQuery) || c.Description.Contains(enteredQuery) );
                return await query.ToArrayAsync();
            }

            public async Task<bool> SaveChangesAsync()
            {
                return await _appDbContext.SaveChangesAsync() > 0;
            }
    }
}
