using Azure.Storage.Blobs;

namespace Iteration5.Models
{
    public class BlobRepository : IBlobRepository
    {
        private readonly BlobServiceClient _blobServiceClient;
        private BlobContainerClient client;

        public BlobRepository(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
            client = _blobServiceClient.GetBlobContainerClient("unibooksstorageacc");
        }

        public Task<BlobObject> GetBlobFile(string name)
        {

        }
        public async Task<string> UploadBlobFile(string filePath, string filename)
        {
            var blobClient = client.GetBlobClient(filename);
            var status = await blobClient.UploadAsync(filePath);

            //this returns a string of where exactly your file is stored
            return blobClient.Uri.AbsoluteUri;
        }
        public void DeleteBlob(string name)
        {

        }
        public Task<List<string>> ListBlobs()
        {

        }

    }
}
