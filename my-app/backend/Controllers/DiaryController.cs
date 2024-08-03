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

        public DiariesController(DiaryService diaryService)
        {
            _diaryService = diaryService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Diary>>> GetDiaries(int userId)
        {
            return await _diaryService.GetDiariesAsync(userId);
        }

        [HttpGet("{userId}/{id}")]
        public async Task<ActionResult<Diary>> GetDiary(int userId, int id)
        {
            var diary = await _diaryService.GetDiaryByIdAsync(id, userId);

            if (diary == null)
            {
                return NotFound();
            }

            return diary;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiary(Diary diary)
        {
            var success = await _diaryService.CreateDiaryAsync(diary);

            if (!success)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetDiary), new { userId = diary.UserId, id = diary.Id }, diary);
        }

        [HttpPut("{userId}/{id}")]
        public async Task<IActionResult> UpdateDiary(int userId, int id, Diary diary)
        {
            if (id != diary.Id)
            {
                return BadRequest();
            }

            var success = await _diaryService.UpdateDiaryAsync(diary, userId);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{userId}/{id}")]
        public async Task<IActionResult> DeleteDiary(int userId, int id)
        {
            var success = await _diaryService.DeleteDiaryAsync(id, userId);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
