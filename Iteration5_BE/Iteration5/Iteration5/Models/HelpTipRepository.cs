using System;
using Microsoft.EntityFrameworkCore;

namespace Iteration5.Models
{
    public class HelpTipRepository : IHelpTipRepository
    {
        private readonly AppDbContext _appDbContext;

        public HelpTipRepository(AppDbContext appDbContext)
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

        public async Task<HelpTip[]> GetAllHelpTipsAsync()
        {
            IQueryable<HelpTip> query = _appDbContext.HelpTips;
            return await query.ToArrayAsync();
        }

        public async Task<HelpTip> GetAHelpTipAsync(int Help_ID)
        {
            IQueryable<HelpTip> query = _appDbContext.HelpTips.Where(c => c.Help_ID == Help_ID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<HelpTip[]> GetSearchedHelpTipAsync(string enteredQuery)
        {
            IQueryable<HelpTip> query = _appDbContext.HelpTips.Where(c => c.Name.Contains(enteredQuery)
                                                                || c.Description.Contains(enteredQuery)
                                                                || c.Date.Contains(enteredQuery) );
            return await query.ToArrayAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
    }
}
