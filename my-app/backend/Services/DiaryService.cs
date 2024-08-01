using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Services.backend
{
    public class DiaryService
    {
        private readonly ApplicationDbContext _context;
        public DiaryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Diary>> GetDiariesAsync()
        {
            return await _context.Diaries.ToListAsync();
        }
        public async Task<Diary> GetDiaryAsync(string Id)
        {
            return await _context.Diaries.FindAsync(Id);
        }

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

        public async Task<bool> DeleteDiaryAsync(string id)
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