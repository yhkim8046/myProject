using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _userService.LoginUserAsync(loginRequest.UserId, loginRequest.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            return Ok(new { message = "Login successful." });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            var result = await _userService.RegisterUserAsync(registerRequest.UserId, registerRequest.Password);
            if (!result)
            {
                return BadRequest(new { message = "User already exists." });
            }

            return Ok(new { message = "Registration successful." });
        }
    }

    public class LoginRequest
    {
        public required string UserId { get; set; }
        public required string Password { get; set; }
    }

    public class RegisterRequest
    {
        public required string UserId { get; set; }
        public required string Password { get; set; }
    }
}
