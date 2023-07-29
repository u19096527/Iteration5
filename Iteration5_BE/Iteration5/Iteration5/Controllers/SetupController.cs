using Iteration5.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Iteration5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetupController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<SetupController> _logger;
        public SetupController(AppDbContext appDbContext, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<SetupController> logger) 
        { 
            _appDbContext = appDbContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetAllRoles")]

        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        [HttpPost]
        [Route("CreateRole")]

        public async Task<IActionResult> CreateRole(string name)
        {
            var roleExist = await _roleManager.RoleExistsAsync(name);

            if (!roleExist)
            {
                var roleResult = await _roleManager.CreateAsync(new IdentityRole(name));

                if (roleResult.Succeeded)
                {
                    _logger.LogInformation($"The role {name} has been added successfully");
                    return Ok(new
                    {
                        result = $"The role {name} has been added successfully"
                    });
                }
                else
                {
                    _logger.LogInformation($"The role {name} has not been added");
                    return BadRequest(new 
                    {
                        error = $"The role {name} has not been added"
                    });
                }
            }
            return BadRequest("Role already exists");
        }
    }
}
