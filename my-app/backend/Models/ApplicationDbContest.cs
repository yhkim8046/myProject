using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Diary> Diaries { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }

        public ICollection<Diary> Diaries { get; set; } = new List<Diary>();
    }

    public class Diary
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Content { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
