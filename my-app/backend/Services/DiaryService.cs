using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{
    public class DiaryService
    {
        private readonly ApplicationDbContext _context;

        public DiaryService(ApplicationDbContext context)
        {
            _context = context;
        }


        //Reading 
        public async Task<Diary?> GetDiaryByIdAsync(int diaryId, string userId)
        {
            return await _context.Diaries
                                 .Where(d => d.DiaryId == diaryId && d.UserId == userId)
                                 .FirstOrDefaultAsync();
        }

        public async Task<List<Diary>> GetDiariesAsync(string userId)
        {
            return await _context.Diaries
                                 .Where(d => d.UserId == userId)
                                 .ToListAsync();
        }


        //Creating 
        public async Task<bool> CreateDiaryAsync(Diary diary)
        {
            _context.Diaries.Add(diary);
            return await _context.SaveChangesAsync() > 0;
        }


        //updating
        public async Task<bool> UpdateDiaryAsync(Diary diary, int diaryId)
        {
            if (diary.DiaryId != diaryId)
            {
                return false;
            }

            _context.Diaries.Update(diary);
            return await _context.SaveChangesAsync() > 0;
        }


        //Deleting
        public async Task<bool> DeleteDiaryAsync(int diaryId)
        {
            var diary = await _context.Diaries
                                      .Where(d => d.DiaryId == diaryId)
                                      .FirstOrDefaultAsync();

            if (diary == null)
            {
                return false;
            }

            _context.Diaries.Remove(diary);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
