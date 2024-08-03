using Xunit;
using Microsoft.EntityFrameworkCore;
using Services;
using Models;

public class UserServiceTests
{
    private readonly UserService _userService;
    private readonly ApplicationDbContext _context;

    public UserServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _userService = new UserService(_context);
    }

    [Fact]
    public void GenerateSalt_ShouldReturnNonEmptyString()
    {
        var salt = _userService.GenerateSalt();
        Assert.False(string.IsNullOrEmpty(salt));
    }

    [Fact]
    public void HashPassword_ShouldReturnHash()
    {
        var salt = _userService.GenerateSalt();
        var hash = _userService.HashPassword("password123", salt);

        Assert.False(string.IsNullOrEmpty(hash));
        Assert.NotEqual("password123", hash);
    }

    [Fact]
    public async Task RegisterUserAsync_ShouldReturnTrue_WhenUserIsNew()
    {
        var newUserId = "newUser";
        var newPassword = "newPassword";

        var result = await _userService.RegisterUserAsync(newUserId, newPassword);

        Assert.True(result);
        Assert.NotNull(await _context.Users.SingleOrDefaultAsync(u => u.UserId == newUserId));
    }

    [Fact]
    public async Task RegisterUserAsync_ShouldReturnFalse_WhenUserAlreadyExists()
    {
        var existingUserId = "existingUser";
        _context.Users.Add(new User { UserId = existingUserId, Password = "hashedPassword" });
        await _context.SaveChangesAsync();

        var result = await _userService.RegisterUserAsync(existingUserId, "anyPassword");

        Assert.False(result);
    }
}
