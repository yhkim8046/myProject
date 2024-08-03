using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiariesController : ControllerBase
    {
        private readonly DiaryService _diaryService;
        private readonly UserService _userService;
        private readonly ILogger<DiariesController> _logger;

        public DiariesController(DiaryService diaryService, UserService userService, ILogger<DiariesController> logger)
        {
            _diaryService = diaryService;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Diary>>> GetDiaries(string userId)
        {
            _logger.LogInformation("Fetching diaries for userId: {userId}", userId);
            var diaries = await _diaryService.GetDiariesAsync(userId);
            if (diaries == null || diaries.Count == 0)
            {
                _logger.LogWarning("No diaries found for userId: {userId}", userId);
                return NotFound(new { message = "No diaries found for this user." });
            }
            _logger.LogInformation("Diaries retrieved successfully for userId: {userId}", userId);
            return Ok(diaries);
        }

        [HttpGet("{userId}/{diaryId}")]
        public async Task<ActionResult<Diary>> GetDiary(string userId, int diaryId)
        {
            _logger.LogInformation("Fetching diary with diaryId: {diaryId} for userId: {userId}", diaryId, userId);
            var diary = await _diaryService.GetDiaryByIdAsync(diaryId, userId);

            if (diary == null)
            {
                _logger.LogWarning("Diary with diaryId: {diaryId} not found for userId: {userId}", diaryId, userId);
                return NotFound(new { message = "Diary not found." });
            }

            _logger.LogInformation("Diary with diaryId: {diaryId} retrieved successfully for userId: {userId}", diaryId, userId);
            return Ok(diary);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiary([FromBody] Diary diary)
        {
            _logger.LogInformation("Creating new diary for userId: {userId}", diary.UserId);
            if (string.IsNullOrEmpty(diary.UserId))
            {
                _logger.LogWarning("UserId is required.");
                return BadRequest(new { message = "UserId is required." });
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for diary creation.");
                return BadRequest(ModelState);
            }

            var success = await _diaryService.CreateDiaryAsync(diary);

            if (!success)
            {
                _logger.LogError("Error occurred while creating the diary for userId: {userId}", diary.UserId);
                return StatusCode(500, new { message = "An error occurred while creating the diary." });
            }

            _logger.LogInformation("Diary created successfully for userId: {userId}, diaryId: {diaryId}", diary.UserId, diary.DiaryId);
            return CreatedAtAction(nameof(GetDiary), new { userId = diary.UserId, diaryId = diary.DiaryId }, diary);
        }

        [HttpPut("{diaryId}")]
        public async Task<IActionResult> UpdateDiary(int diaryId, [FromBody] Diary diary)
        {
            _logger.LogInformation("Updating diary with diaryId: {diaryId} for userId: {userId}", diaryId, diary.UserId);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for diary update.");
                return BadRequest(ModelState);
            }

            if (diaryId != diary.DiaryId)
            {
                _logger.LogWarning("Diary ID mismatch: requested diaryId {diaryId}, actual diaryId {actualDiaryId}", diaryId, diary.DiaryId);
                return BadRequest(new { message = "Diary ID mismatch." });
            }

            var success = await _diaryService.UpdateDiaryAsync(diary, diaryId);

            if (!success)
            {
                _logger.LogWarning("Diary with diaryId: {diaryId} not found or update failed.", diaryId);
                return NotFound(new { message = "Diary not found or update failed." });
            }

            _logger.LogInformation("Diary with diaryId: {diaryId} updated successfully.", diaryId);
            return NoContent();
        }


        [HttpDelete("{diaryId}")]
        public async Task<IActionResult> DeleteDiary(int diaryId)
        {
            _logger.LogInformation("Deleting diary with diaryId: {diaryId}", diaryId);
            var success = await _diaryService.DeleteDiaryAsync(diaryId);

            if (!success)
            {
                _logger.LogWarning("Diary with diaryId: {diaryId} not found or deletion failed.", diaryId);
                return NotFound(new { message = "Diary not found or deletion failed." });
            }

            _logger.LogInformation("Diary with diaryId: {diaryId} deleted successfully.", diaryId);
            return NoContent();
        }
    }
}
