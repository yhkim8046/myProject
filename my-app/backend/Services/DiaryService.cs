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

        //post
        public async Task<Diary> CreateDiaryAsync(Diary diary)
        {
            _context.Diaries.Add(diary);
            await _context.SaveChangesAsync();
            return diary;
        }

        //findAll
        public async Task<IEnumerable<Diary>> FindAllDiariesAsync()
        {
            return await _context.Diaries.ToListAsync();
        }

        //findById
        public async Task<Diary> FindDiaryByIdAsync(int DiaryId)
        {
            return await _context.Diaries.FindAsync(DiaryId);
        }

        //update
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

        //Delete 
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