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

        public async Task<List<Diary>> GetDiariesAsync(int userId)
        {
            return await _context.Diaries
                                 .Where(d => d.UserId == userId)
                                 .ToListAsync();
        }

        public async Task<Diary?> GetDiaryByIdAsync(int id, int userId)
        {
            return await _context.Diaries
                                 .Where(d => d.Id == id && d.UserId == userId)
                                 .FirstOrDefaultAsync();
        }

        public async Task<bool> CreateDiaryAsync(Diary diary)
        {
            _context.Diaries.Add(diary);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateDiaryAsync(Diary diary, int userId)
        {
            if (diary.UserId != userId)
            {
                return false;
            }

            _context.Diaries.Update(diary);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteDiaryAsync(int id, int userId)
        {
            var diary = await _context.Diaries
                                      .Where(d => d.Id == id && d.UserId == userId)
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
