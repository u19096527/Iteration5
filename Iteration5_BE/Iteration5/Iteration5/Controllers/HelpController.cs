using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Iteration5.Models;
using Iteration5.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Cors;
using Iteration5.Controllers;
using Azure;
using Azure.Storage.Blobs;
using System.Configuration;
using Microsoft.Net.Http.Headers;

namespace Iteration5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpController : ControllerBase
    {

        private readonly IHelpTipRepository _helpTipRepository;
        private readonly IBlobRepository _blobRepository;

        private readonly IConfiguration _configuration;

        public HelpController(IHelpTipRepository helpTipRepository, IBlobRepository blobRepository, IConfiguration configuration)
        {
            _helpTipRepository = helpTipRepository;
            _blobRepository = blobRepository;
            _configuration = configuration;

        }

        // Retrieves all the help tips
        [HttpGet]
        [Route("GetAllHelpTips")]
        public async Task<IActionResult> GetAllHelpTips()
        {
            try
            {
                var results = await _helpTipRepository.GetAllHelpTipsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpGet]
        [Route("GetAHelpTip/{Help_ID}")]
        public async Task<IActionResult> GetAHelpTip(int Help_ID)
        {
            try
            {
                var answer = await _helpTipRepository.GetAHelpTipAsync(Help_ID);

                if (answer == null) return NotFound("Help Tip does not exist");

                return Ok(answer);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Retrieves help tip results filtered by the search term
        [HttpGet]
        [Route("GetSearchedHelpTip/{enteredQuery}")]
        public async Task<IActionResult> GetSearchedHelpTip(string enteredQuery)
        {
            try
            {
                var result = await _helpTipRepository.GetSearchedHelpTipAsync(enteredQuery);
                if (result == null)
                {
                    return NotFound("Help tip does not exist. You may need to create it first");
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }


        // Adds a new help tip
        [HttpPost]
        [Route("AddHelpTip")]
        public async Task<IActionResult> AddHelpTip(HelpTipViewModel newHelpTip)
        {
            try
            {
                //var blobStorageURL = await _blobRepository.UploadBlobFile(newHelpTip.FileName, newHelpTip.FilePath);


                var helpTip = new HelpTip
                {
                    Name = newHelpTip.Name,
                    Description = newHelpTip.Description,
                    Date = newHelpTip.Date,
                    FilePath = newHelpTip.FilePath,
                    FileName = newHelpTip.FileName
                };

                _helpTipRepository.Add(helpTip);
                await _helpTipRepository.SaveChangesAsync();
                return Ok(helpTip);

            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }
        }

        // Edits details of a helpTip
        [HttpPut]
        [Route("EditHelpTip/{helpid}")]
        public async Task<ActionResult<HelpTipViewModel>> EditHelpTip(int helpId, HelpTipViewModel helpTipModel)
        {
            try
            {
                var existingHelpTip = await _helpTipRepository.GetAHelpTipAsync(helpId);
                if (existingHelpTip == null)
                {
                    return NotFound($"The help tip does not exist");
                }

                existingHelpTip.Name = helpTipModel.Name;
                existingHelpTip.Description = helpTipModel.Description;
                existingHelpTip.Date = helpTipModel.Date;
                existingHelpTip.FileName = helpTipModel.FileName;

                if (await _helpTipRepository.SaveChangesAsync())
                {
                    return Ok(existingHelpTip);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
            return BadRequest("Your request is invalid");
        }

        // Deletes a helpTip
        [HttpDelete]
        [Route("DeleteHelpTip/{helpId}")]
        public async Task<IActionResult> DeleteHelpTip(int helpId)
        {
            try
            {
                var existingHelpTip = await _helpTipRepository.GetAHelpTipAsync(helpId);
                if (existingHelpTip == null)
                {
                    return NotFound($"The help tip does not exist");
                }

                _blobRepository.DeleteBlob(existingHelpTip.FileName);
                _helpTipRepository.Delete(existingHelpTip);

                if (await _helpTipRepository.SaveChangesAsync())
                {
                    return Ok(existingHelpTip);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
            return BadRequest("Your request is invalid");
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


    }
}
