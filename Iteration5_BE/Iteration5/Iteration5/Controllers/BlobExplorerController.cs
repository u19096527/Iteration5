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

        public BlobExplorerController(IBlobRepository blobRepository)
        {
            _blobRepository = blobRepository;
        }

        [HttpGet]
        [Route("GetBlobFile")]
        public async Task<IActionResult> GetBlobFile(string path)
        {
            BlobObject result = await _blobRepository.GetBlobFile(path);
            return File(result.Content, result.ContentType);
        }

        [HttpPost("UploadBlobFile")]
        public async Task<IActionResult> UploadBlobFile([FromBody] BlobContentModel model)
        {
            var result = await _blobRepository.UploadBlobFile(model.Filepath, model.FileName);
            return Ok(result);
        }

        [HttpDelete("DeleteBlob")]
        public IActionResult DeleteBlob(string path)
        {
            _blobRepository.DeleteBlob(path);
            return Ok();
        }

        [HttpGet("ListBlobs")]
        public async Task<IActionResult> ListBlobs()
        {
            var result = await _blobRepository.ListBlobs();
            return Ok(result);
        }
    }
}
