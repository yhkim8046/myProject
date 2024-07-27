namespace backend.Models
{
    public class User
    {
        private string _id;
        private string _username;
        private string _password;

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

        public User(string id, string username, string password)
        {
            _id = id;
            _username = username;
            _password = password;
        }

        public User() { }

    }
}
