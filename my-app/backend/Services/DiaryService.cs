using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace backend.Services
{
    public class DiaryService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _connectionString;


        public DiaryService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

        // Create a diary with a specific user
        public async Task<Diary> CreateDiaryAsync(Diary diary)
        {
            _context.Diaries.Add(diary);
            await _context.SaveChangesAsync();
            return diary;
        }

        // Find all diaries
        public async Task<IEnumerable<Diary>> FindAllDiariesAsync()
        {
            return await _context.Diaries.ToListAsync();
        }

        // Find a diary by ID
        public async Task<Diary> FindDiaryByIdAsync(int id)
        {
            return await _context.Diaries.FirstOrDefaultAsync(d => d.DiaryId == id);
        }

        // Find diaries by user ID
        public async Task<IEnumerable<Diary>> FindDiariesByUserIdAsync(string userId)
        {
            return await _context.Diaries.Where(d => d.UserId == userId).ToListAsync();
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
        public async Task<bool> DeleteDiaryAsync(int diaryId)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            await connection.OpenAsync();
            using (var command = new SqlCommand("DELETE FROM Diaries WHERE DiaryId = @DiaryId", connection))
            {
                command.Parameters.Add(new SqlParameter("@DiaryId", SqlDbType.Int) { Value = diaryId });

                int rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
    }
}
