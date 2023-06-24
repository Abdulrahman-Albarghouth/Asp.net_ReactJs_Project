namespace torholding_test.Models
{
    public class LoginRequest
    {
        public LoginRequest()
        {
            this.EMail = String.Empty;
            this.Password = String.Empty;
        }

        public string EMail { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
    }

}