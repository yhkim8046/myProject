using System.ComponentModel.DataAnnotations;

namespace backend.Models{
    public class Diary{

        [Key]
        public string DiaryId{get; set;}
        
        [Required(ErrorMessage = 'Required')] 
        [MaxLength(64, ErrorMessage ="The max length is 64.")]
        public string Title{get; set;}

        [Required]
        [MaxLength(5000, ErrorMessage ="The max length is 5000.")]
        public string Content{get; set;}

        [Required]
        public DateTime Date{get; set;}
        
        [Required]
        public TimeOnly Time{get; set;}
    }
}