using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        public DiariesController(DiaryService diaryService, UserService userService)
        {
            _diaryService = diaryService;
            _userService = userService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Diary>>> GetDiaries(string userId)
        {
            var diaries = await _diaryService.GetDiariesAsync(userId);
            if (diaries == null || diaries.Count == 0)
            {
                return NotFound(new { message = "No diaries found for this user." });
            }
            return Ok(diaries);
        }

        [HttpGet("{userId}/{diaryId}")]
        public async Task<ActionResult<Diary>> GetDiary(string userId, int diaryId)
        {
            var diary = await _diaryService.GetDiaryByIdAsync(diaryId, userId);

            if (diary == null)
            {
                return NotFound(new { message = "Diary not found." });
            }

            return Ok(diary);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiary([FromBody] Diary diary)
        {
            if (string.IsNullOrEmpty(diary.UserId))
            {
                return BadRequest(new { message = "UserId is required." });
            }

            // User 객체를 검증하는 부분을 제거하고 UserId만 처리
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _diaryService.CreateDiaryAsync(diary);

            if (!success)
            {
                return StatusCode(500, new { message = "An error occurred while creating the diary." });
            }

            return CreatedAtAction(nameof(GetDiary), new { userId = diary.UserId, diaryId = diary.DiaryId }, diary);
        }


        [HttpPut("{userId}/{diaryId}")]
        public async Task<IActionResult> UpdateDiary(int diaryId, [FromBody] Diary diary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (diaryId != diary.DiaryId)
            {
                return BadRequest(new { message = "Diary ID mismatch." });
            }

            var success = await _diaryService.UpdateDiaryAsync(diary, diaryId);

            if (!success)
            {
                return NotFound(new { message = "Diary not found or update failed." });
            }

            return NoContent();
        }

        [HttpDelete("{userId}/{diaryId}")]
        public async Task<IActionResult> DeleteDiary(int diaryId)
        {
            var success = await _diaryService.DeleteDiaryAsync(diaryId);

            if (!success)
            {
                return NotFound(new { message = "Diary not found or deletion failed." });
            }

            return NoContent();
        }
    }
}
