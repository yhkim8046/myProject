using System.ComponentModel.DataAnnotations;

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
    }
}
