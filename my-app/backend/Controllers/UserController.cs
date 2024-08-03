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
            if (string.IsNullOrEmpty(registerRequest.UserId) || string.IsNullOrEmpty(registerRequest.Password))
            {
                return BadRequest(new { message = "UserId and Password are required." });
            }

            var success = await _userService.RegisterUserAsync(registerRequest.UserId, registerRequest.Password);

            if (!success)
            {
                return BadRequest(new { message = "User already exists or invalid data." });
            }

            return Ok(new { message = "Registration successful." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.UserId) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "UserId and Password are required." });
            }

            var user = await _userService.LoginUserAsync(loginRequest.UserId, loginRequest.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid username or password." });
            }

            return Ok(new { message = "Login successful.", userId = user.UserId });
        }
    }

    public class LoginRequest
    {
        public string UserId { get; set; }
        public string Password { get; set; }
    }
}
