using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("/api/diaries")]
    [ApiController]
    public class DiaryController : ControllerBase
    {
        private readonly DiaryService _diaryService;
        private readonly ApplicationDbContext _context;

        public DiaryController(DiaryService diaryService, ApplicationDbContext context)
        {
            _diaryService = diaryService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diary>>> GetDiaries()
        {
            var diaries = await _diaryService.FindAllDiariesAsync();
            return Ok(diaries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Diary>> GetDiary(int id)
        {
            var diary = await _diaryService.FindDiaryByIdAsync(id);
            if (diary == null)
            {
                return NotFound();
            }
            return Ok(diary);
        }

        [HttpPost]
        public async Task<ActionResult<Diary>> CreateDiary([FromBody] Diary diary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // UserId가 올바르게 제공되지 않았을 경우 처리
            if (string.IsNullOrEmpty(diary.UserId))
            {
                return BadRequest("UserId is required.");
            }

            var createdDiary = await _diaryService.CreateDiaryAsync(diary);
            return CreatedAtAction(nameof(GetDiary), new { id = createdDiary.DiaryId }, createdDiary);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiary(int id, [FromBody] Diary diary)
        {
            if (id != diary.DiaryId)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _diaryService.UpdateDiaryAsync(diary);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiary(int id)
        {
            var result = await _diaryService.DeleteDiaryAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Diary>>> GetDiariesByUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("UserId is required.");
            }

            var diaries = await _diaryService.FindDiariesByUserIdAsync(userId);
            if (diaries == null || !diaries.Any())
            {
                return NotFound("No diaries found for the given UserId.");
            }

            return Ok(diaries);
        }
    }
}
