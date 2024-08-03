using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Services;
using Models;

public class DiaryServiceTests
{
    private readonly ApplicationDbContext _context;
    private readonly DiaryService _diaryService;

    public DiaryServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "DiaryTestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _diaryService = new DiaryService(_context);
    }

    private async Task SeedData()
    {
        // Clear existing data
        _context.Diaries.RemoveRange(_context.Diaries);
        await _context.SaveChangesAsync();

        // Seed the database with some data
        _context.Diaries.AddRange(new List<Diary>
        {
            new Diary { UserId = "user1", Title = "Diary 1", Content = "Content 1" },
            new Diary { UserId = "user1", Title = "Diary 2", Content = "Content 2" }
        });
        await _context.SaveChangesAsync();
    }

    [Fact]
    public async Task GetDiaryByIdAsync_ReturnsDiary_WhenDiaryExists()
    {
        // Arrange
        await SeedData();
        var diary = await _context.Diaries.FirstAsync(d => d.Title == "Diary 1");

        // Act
        var result = await _diaryService.GetDiaryByIdAsync(diary.DiaryId, diary.UserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Diary 1", result.Title);
    }

    [Fact]
    public async Task GetDiariesAsync_ReturnsAllDiariesForUser()
    {
        // Arrange
        await SeedData();

        // Act
        var result = await _diaryService.GetDiariesAsync("user1");

        // Assert
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public async Task CreateDiaryAsync_AddsDiaryToDatabase()
    {
        // Arrange
        await SeedData();
        var diary = new Diary { UserId = "user1", Title = "New Diary", Content = "New Content" };

        // Act
        var result = await _diaryService.CreateDiaryAsync(diary);

        // Assert
        Assert.True(result);
        var createdDiary = await _context.Diaries.FirstOrDefaultAsync(d => d.Title == "New Diary");
        Assert.NotNull(createdDiary);
        Assert.Equal("New Content", createdDiary.Content);
    }

    [Fact]
    public async Task UpdateDiaryAsync_UpdatesDiaryInDatabase()
    {
        // Arrange
        await SeedData();
        var diary = await _context.Diaries.FirstAsync();
        diary.Title = "Updated Diary";
        diary.Content = "Updated Content";

        // Act
        var result = await _diaryService.UpdateDiaryAsync(diary, diary.DiaryId);

        // Assert
        Assert.True(result);
        var updatedDiary = await _context.Diaries.FindAsync(diary.DiaryId);
        Assert.Equal("Updated Diary", updatedDiary.Title);
        Assert.Equal("Updated Content", updatedDiary.Content);
    }

    [Fact]
    public async Task DeleteDiaryAsync_RemovesDiaryFromDatabase()
    {
        // Arrange
        await SeedData();
        var diary = await _context.Diaries.FirstAsync();

        // Act
        var result = await _diaryService.DeleteDiaryAsync(diary.DiaryId);

        // Assert
        Assert.True(result);
        var deletedDiary = await _context.Diaries.FindAsync(diary.DiaryId);
        Assert.Null(deletedDiary);
    }
}
