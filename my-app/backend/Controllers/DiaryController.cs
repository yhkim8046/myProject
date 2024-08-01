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

        public DiaryController(DiaryService diaryService)
        {
            _diaryService = diaryService;
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

            // Assuming the UserId is provided in the request body
            var createdDiary = await _diaryService.CreateDiaryAsync(diary.UserId, diary);
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
    }
}
