using Microsoft.EntityFrameworkCore;

namespace Models
{   
    // DbContext configuration for database dependency injection
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
          public ApplicationDbContext()
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Diary> Diaries { get; set; }
    }

    //Object user 
    public class User
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string? Salt { get; set; }

        public ICollection<Diary> Diaries { get; set; } = new List<Diary>();
    }


    //Object Diary 
    public class Diary
    {
        public int DiaryId{get; set;}
        public string Title { get; set; } 
        public string Content { get; set; }
        public DateTime Date { get; set; }

        public string UserId { get; set; }
    }
}
