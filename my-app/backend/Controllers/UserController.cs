using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserService.RegisterRequest registerRequest)
        {
            var success = await _userService.RegisterUserAsync(registerRequest.UserId, registerRequest.Password);

            if (!success)
            {
                return BadRequest(new { message = "User already exists or invalid data." });
            }

            return Ok(new { message = "Registration successful." });
        }
    }
}
