using System;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;

namespace Iteration5.Models
{
    public class HelpTipRepository : IHelpTipRepository
    {
        private readonly AppDbContext _appDbContext;

        //BLOB CODE
        private readonly BlobServiceClient _blobServiceClient;
        private BlobContainerClient client;
        public static readonly List<string> VideoExtensions = new List<string> { ".MP4", ".MOV" };


        public HelpTipRepository(AppDbContext appDbContext, BlobServiceClient blobServiceClient)
        {
            _appDbContext = appDbContext;
            _blobServiceClient = blobServiceClient;
            client = _blobServiceClient.GetBlobContainerClient("blobcontainerhelptip");
        }

        //OG HELP TIP CODE FUNCTIONS
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

        //BLOB CODE 
        public async Task<BlobObject> GetBlobFile(string url)
        {
            //https://unibooksstorageacc.blob.core.windows.net/blobcontainerhelptip/How To Whiten Teeth.mp4
            var fileName = new Uri(url).Segments.LastOrDefault();
            var blobClient = client.GetBlobClient(fileName);
            //check if this file exists
            if (await blobClient.ExistsAsync())
            {
                BlobDownloadResult content = await blobClient.DownloadContentAsync();
                var downloadedData = content.Content.ToStream();

                if (VideoExtensions.Contains(Path.GetExtension(fileName.ToUpperInvariant())))
                {
                    var extension = Path.GetExtension(fileName);
                    return new BlobObject
                    {
                        Content = downloadedData,
                        ContentType = "video/" + extension.Remove(0, 1)
                    };
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
        public async Task<string> UploadBlobFile(string filePath, string filename)
        {
            var blobClient = client.GetBlobClient(filename);
            var status = await blobClient.UploadAsync(filePath);

            //this returns a string of where exactly your file is stored
            return blobClient.Uri.AbsoluteUri;
        }
        public async void DeleteBlob(string path)
        {
            var fileName = new Uri(path).Segments.LastOrDefault();
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
