using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _jwtSecret;

        public UserService(ApplicationDbContext context, string jwtSecret)
        {
            _context = context;
            _jwtSecret = jwtSecret;
        }

        public async Task<bool> RegisterUserAsync(string userId, string password)
        {
            //Verifying duplication
            if (await _context.Users.AnyAsync(u => u.UserId == userId))
            {
                return false;
            }

            // Generating salt 
            var salt = GenerateSalt();
            var hashedPassword = HashPassword(password, salt);

            // Register logic 
            var user = new User { UserId = userId, Password = hashedPassword, Salt = salt };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetUserByIdAsync(string userId)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);
        }


        public class RegisterRequest
        {
            public string UserId { get; set; }
            public string Password { get; set; }
        }

        public async Task<string?> LoginUserAsync(string userId, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);

            // user not found
            if (user == null)
            {
                return null; 
            }

            var hashedPassword = HashPassword(password, user.Salt);

            if (hashedPassword != user.Password)
            {
                return null; // wrong password
            }

            //Creating JWT token
            var token = GenerateJwtToken(user);
            return token; // login with jwt token
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // set lifecycle for token
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        // Generating Salt 
        public string GenerateSalt()
        {
            byte[] saltBytes = new byte[16];
            using (var provider = new RNGCryptoServiceProvider())
            {
                provider.GetBytes(saltBytes);
            }
            return Convert.ToBase64String(saltBytes);
        }

        // Password hashing
        public string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = $"{password}{salt}";
                byte[] saltedPasswordBytes = Encoding.UTF8.GetBytes(saltedPassword);
                byte[] hashBytes = sha256.ComputeHash(saltedPasswordBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }
    }
}
