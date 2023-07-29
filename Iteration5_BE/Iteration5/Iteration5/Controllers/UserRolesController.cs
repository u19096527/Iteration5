using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Iteration5.Models;
using Iteration5.ViewModels;
using System.IO;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;

namespace Iteration5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly IUserRoleRepository _userRoleRepository;
        private RoleManager<IdentityRole> _roleManager;
        private UserManager<AppUser> userManager;

        public UserRolesController(IUserRoleRepository userRoleRepository)
        {
            _userRoleRepository = userRoleRepository;
        }

        // Retrieves all the help tips
        [HttpGet]
        [Route("GetAllUserRoles")]
        public async Task<IActionResult> GetAllUserRoles()
        {
            try
            {
                var results = await _userRoleRepository.GetAllUserRolesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpGet]
        [Route("GetAUserRole/{Userrole_ID}")]
        public async Task<IActionResult> GetAUserRole(int Userrole_ID)
        {
            try
            {
                var answer = await _userRoleRepository.GetAUserRoleAsync(Userrole_ID);

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
        [Route("GetSearchedUserRole/{enteredQuery}")]
        public async Task<IActionResult> GetSearchedUserRole(string enteredQuery)
        {
            try
            {
                var result = await _userRoleRepository.GetSearchedUserRoleAsync(enteredQuery);
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
        [Route("AddUserRole")]
        public async Task<IActionResult> AddUserRole(UserRoleViewModel newUserRole)
        {
            try
            {
                var UserRole = new UserRole
                {
                    Name = newUserRole.Name,
                    Description = newUserRole.Description,
                };

                _userRoleRepository.Add(UserRole);
                await _userRoleRepository.SaveChangesAsync();
                return Ok(UserRole);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }
        }

        // Edits details of a UserRole
        [HttpPut]
        [Route("EditUserRole/{Userrole_ID}")]
        public async Task<ActionResult<UserRoleViewModel>> EditUserRole(int Userrole_ID, UserRoleViewModel UserRoleModel)
        {
            try
            {
                var existingUserRole = await _userRoleRepository.GetAUserRoleAsync(Userrole_ID);
                if (existingUserRole == null)
                {
                    return NotFound($"The help tip does not exist");
                }

                existingUserRole.Name = UserRoleModel.Name;
                existingUserRole.Description = UserRoleModel.Description;

                if (await _userRoleRepository.SaveChangesAsync())
                {
                    return Ok(existingUserRole);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
            return BadRequest("Your request is invalid");
        }

        // Deletes a UserRole
        [HttpDelete]
        [Route("DeleteUserRole/{Userrole_ID}")]
        public async Task<IActionResult> DeleteUserRole(int Userrole_ID)
        {
            try
            {
                var existingUserRole = await _userRoleRepository.GetAUserRoleAsync(Userrole_ID);
                if (existingUserRole == null)
                {
                    return NotFound($"The help tip does not exist");
                }

                _userRoleRepository.Delete(existingUserRole);

                if (await _userRoleRepository.SaveChangesAsync())
                {
                    return Ok(existingUserRole);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
            return BadRequest("Your request is invalid");
        }

    }
}