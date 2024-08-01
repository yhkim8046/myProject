using Microsoft.AspNetCore.Mvc;
using Services.backend;
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

        // GET: api/diaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diary>>> GetDiaries()
        {
            var diaries = await _diaryService.FindAllDiariesAsync();
            return Ok(diaries);
        }

        // GET: api/diaries/{DiaryId}
        [HttpGet("{DiaryId}")]
        public async Task<ActionResult<Diary>> GetDiary(int DiaryId)
        {
            var diary = await _diaryService.FindDiaryByIdAsync(DiaryId);
            if (diary == null)
            {
                return NotFound();
            }
            return Ok(diary);
        }

        // POST: api/diaries
        [HttpPost]
        public async Task<ActionResult<Diary>> CreateDiary([FromBody] Diary diary)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return BadRequest(new { Message = "Validation failed", Errors = errors });
            }

            var createdDiary = await _diaryService.CreateDiaryAsync(diary);
            return CreatedAtAction(nameof(GetDiary), new { id = createdDiary.DiaryId }, createdDiary);
        }


        // PUT: api/diaries/{id}
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

        // DELETE: api/diaries/{id}
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
