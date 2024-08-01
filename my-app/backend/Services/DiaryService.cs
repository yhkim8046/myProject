using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DiaryService
    {
        private readonly ApplicationDbContext _context;

        public DiaryService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create a diary with a specific user
        public async Task<Diary> CreateDiaryAsync(string userId, Diary diary)
        {
            diary.UserId = userId;
            _context.Diaries.Add(diary);
            await _context.SaveChangesAsync();
            return diary;
        }

        // Find all diaries
        public async Task<IEnumerable<Diary>> FindAllDiariesAsync()
        {
            return await _context.Diaries.Include(d => d.User).ToListAsync();
        }

        // Find a diary by ID
        public async Task<Diary> FindDiaryByIdAsync(int id)
        {
            return await _context.Diaries.Include(d => d.User).FirstOrDefaultAsync(d => d.DiaryId == id);
        }

        // Update a diary
        public async Task<bool> UpdateDiaryAsync(Diary diary)
        {
            _context.Entry(diary).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        // Delete a diary
        public async Task<bool> DeleteDiaryAsync(int id)
        {
            var diary = await _context.Diaries.FindAsync(id);
            if (diary == null)
            {
                return false;
            }

            _context.Diaries.Remove(diary);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
