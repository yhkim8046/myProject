using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Diary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiaryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(5000)]
        public string Content { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeOnly Time { get; set; }

        // Foreign key property
        [Required]
        public string UserId { get; set; }  // userId를 필수로 설정
    }

}