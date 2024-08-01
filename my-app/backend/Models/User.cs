using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Models
{
    public class User
    {
        [Key]
        [MaxLength(16)]
        public string UserId { get; set; }

        [Required]
        [MaxLength(256)]
        public string Password { get; set; }

        // Navigation property for the diaries
        public ICollection<Diary> Diaries { get; set; }
    }
}
