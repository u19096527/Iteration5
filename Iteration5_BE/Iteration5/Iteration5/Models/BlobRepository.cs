using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Policy;

namespace Iteration5.Models
{
    public class BlobRepository : IBlobRepository
    {
        private readonly BlobServiceClient _blobServiceClient;
        private BlobContainerClient client;
        public static readonly List<string> VideoExtensions = new List<string> { ".MP4", ".MOV" };

        public BlobRepository(BlobServiceClient blobServiceClient, AppDbContext appDbContext)
        {
            _blobServiceClient = blobServiceClient;
            client = _blobServiceClient.GetBlobContainerClient("blobcontainerhelptip");
        }

        public async Task<BlobObject> GetBlobFile(string url)
        {
            //https://unibooksstorageacc.blob.core.windows.net/blobcontainerhelptip/How To Whiten Teeth.mp4
            var fileName = new Uri(url).Segments.LastOrDefault();
                var blobClient = client.GetBlobClient(fileName);
                //check if this file exists
                if (await blobClient.ExistsAsync() )
                {
                    BlobDownloadResult content = await blobClient.DownloadContentAsync();
                    var downloadedData = content.Content.ToStream();

                    if (VideoExtensions.Contains(Path.GetExtension(fileName.ToUpperInvariant() ) ) )
                    {
                        var extension = Path.GetExtension(fileName);
                        return new BlobObject { 
                            Content = downloadedData, 
                            ContentType = "video/" + extension.Remove(0, 1) };
                    }
                    else
                {
                    return null;
                }
                }
                else
                {
                    return null;
                }

        }
        //public async Task<string> UploadBlobFile(string fileName, string filePath)
        //{
        //    var blobClient = client.GetBlobClient(fileName);
        //    var status = await blobClient.UploadAsync(filePath);
        //    //this returns a string of where exactly your file is stored
        //    return blobClient.Uri.AbsoluteUri;

        //}

        public async Task<string> UploadBlobFile(string fileName, byte[] fileData)
        {
            // Check if the file data is empty
            if (fileData == null || fileData.Length == 0)
                throw new ArgumentException("File data is empty.");

            // Check if the file is a video
            var fileExtension = Path.GetExtension(fileName).ToUpperInvariant();
            if (!VideoExtensions.Contains(fileExtension))
                throw new ArgumentException("Only video files are allowed.");

            // Upload the video file to Blob storage
            var blobClient = client.GetBlobClient(fileName);
            var status = await blobClient.UploadAsync(new MemoryStream(fileData));

            // This returns a string of where exactly your file is stored
            return blobClient.Uri.AbsoluteUri;
        }
        public async void DeleteBlob(string path)
        {
            var fileName = path;
            //new Uri(path).Segments.LastOrDefault();
            var blobClient = client.GetBlobClient(fileName);
            await blobClient.DeleteIfExistsAsync();

        }
        public async Task<List<string>> ListBlobs()
        {
            List<string> lst = new List<string>();
            await foreach (var blobItem in client.GetBlobsAsync())
            {
                lst.Add(blobItem.Name);
            }
            return lst;
        }

    }
}
