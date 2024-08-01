using backend.Models;

public class Diary
{
    public int DiaryId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime Date { get; set; }
    public TimeOnly Time { get; set; }

    // Foreign key property
    public string UserId { get; set; }  // <-- 추가

    // Navigation property
    public User User { get; set; }  // <-- 추가
}
