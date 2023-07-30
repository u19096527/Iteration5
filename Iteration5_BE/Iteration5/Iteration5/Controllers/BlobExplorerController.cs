using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Iteration5.Models;
using Iteration5.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Cors;




namespace Iteration5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobExplorerController : ControllerBase
    {
        private readonly IBlobRepository _blobRepository;
        private readonly ILogger<BlobExplorerController> _logger;
        private readonly IHelpTipRepository _helpTipRepository;


        public BlobExplorerController(IBlobRepository blobRepository, ILogger<BlobExplorerController> logger, IHelpTipRepository helpTipRepository)
        {
            _blobRepository = blobRepository;
            _logger = logger;
            _helpTipRepository = helpTipRepository;
        }

        [HttpGet]
        [Route("GetBlobFile")]
        public async Task<IActionResult> GetBlobFile(string path)
        {
            BlobObject result = await _blobRepository.GetBlobFile(path);
            return File(result.Content, result.ContentType);
        }

        //[HttpPost]
        //[Route("UploadBlobFile")]
        //public async Task<IActionResult> UploadBlobFile([FromBody] BlobContentModel model)
        //{
        //    var result = await _blobRepository.UploadBlobFile(model.Filepath, model.FileName);
        //    return Ok(result);
        //}
            
        [HttpDelete]
        [Route("DeleteBlob")]
        public IActionResult DeleteBlob(string path)
        {
            _blobRepository.DeleteBlob(path);
            return Ok();
        }

        [HttpGet]
        [Route("ListBlobs")]
        public async Task<IActionResult> ListBlobs()
        {
            var result = await _blobRepository.ListBlobs();
            return Ok(result);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo(HelpTipViewModel htViewModel)
        {

            if (htViewModel.VideoFile == null || htViewModel.VideoFile.Length == 0)
            return BadRequest("No file uploaded.");

            // Check if the file is a video
            if (!htViewModel.VideoFile.ContentType.StartsWith("video/mp4"))
                return BadRequest("Only video files are allowed.");

            // Convert the video file to a byte array
            byte[] fileData;
            using (var memoryStream = new MemoryStream())
            {
                await htViewModel.VideoFile.CopyToAsync(memoryStream);
                fileData = memoryStream.ToArray();
            }

            try
            {
                string containerName = "blobcontainerhelptip"; // Replace with your container name
                string fileName = htViewModel.FileName; // You may want to generate a unique name for the file

                // Upload the video file to Blob storage using the BlobRepository
                string blobUrl = await _blobRepository.UploadBlobFile(fileName, fileData);

                return Ok($"Video uploaded successfully. Blob URL: {blobUrl}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error uploading video: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("Post")]
        public async Task<IActionResult> Post([FromForm] HelpTipViewModel htViewModel)
        {
            _logger.LogInformation($"Received form data: Name: {htViewModel.Name}, Description: {htViewModel.Description}, Date: {htViewModel.Date}");
            // Process the uploaded file(s)
            var file = htViewModel.VideoFile;

            try
            {
                if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

                if (file != null && file.Length > 0)
                {
                    byte[] fileData;
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        fileData = memoryStream.ToArray();
                    }

                    string containerName = "blobcontainerhelptip"; // Replace with your container name
                    string fileName = file.FileName; // You may want to generate a unique name for the file

                    // Upload the video file to Blob storage using the BlobRepository
                    string blobUrl = await _blobRepository.UploadBlobFile(fileName, fileData);
                    var filePath = blobUrl;

                    var helpTip = new HelpTip
                    {
                        Name = htViewModel.Name,
                        Description = htViewModel.Description,
                        Date = htViewModel.Date,
                        FilePath = filePath,
                        FileName = fileName,
                    };

                    _helpTipRepository.Add(helpTip);
                    await _helpTipRepository.SaveChangesAsync();

                    return Ok(helpTip);
                }
                // Perform your desired logic with the received data
                return Ok("Data received successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error uploading video: {ex.Message}");
            }
        }
    }
}
