﻿namespace Iteration5.Models
{
    public interface IHelpTipRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<HelpTip[]> GetAllHelpTipsAsync();
        Task<HelpTip> GetAHelpTipAsync(int Help_ID);

        Task<HelpTip[]> GetSearchedHelpTipAsync(string enteredQuery);

        Task<BlobObject> GetBlobFile(string name);
        Task<string> UploadBlobFile(string filePath, string filename);
        void DeleteBlob(string name);
        Task<List<string>> ListBlobs();
    }
}
