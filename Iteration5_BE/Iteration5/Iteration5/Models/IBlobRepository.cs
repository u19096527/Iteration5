namespace Iteration5.Models
{
    public interface IBlobRepository
    {
        Task<BlobObject> GetBlobFile(string name);
        Task<string> UploadBlobFile(string filePath, string filename);
        void DeleteBlob(string name);
        Task<List<string>> ListBlobs();
    }
}
