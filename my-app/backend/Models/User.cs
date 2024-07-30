namespace backend.Models
{
    public class User
    {
        public string userId{get; set;}
        public string password{get; set;}

        public User(string userId, string password)
        {
            this.userId = userId;
            this.password = password;
        }
    }
}
