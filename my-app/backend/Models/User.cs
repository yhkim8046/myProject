namespace backend.Models
{
    public class User
    {
        private string _id;
        private string _username;
        private string _password;
        private string _email;

        public string Id
        {
            get => _id;
            set => _id = value;
        }

        public string Username
        {
            get => _username;
            set => _username = value;
        }

        public string Password
        {
            get => _password;
            set => _password = value;
        }

        public string Email
        {
            get => _email;
            set => _email = value;
        }

         public User(string id, string username, string password, string email)
        {
            _id = id;
            _username = username;
            _password = password;
            _email = email;
        }

        public User() { }

    }
}
