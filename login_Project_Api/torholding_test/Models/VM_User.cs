using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Reflection.Metadata.Ecma335;

namespace torholding_test.Models
{
    public class VM_User
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Phone { get; set; }

        public string EMail { get; set; }

        public string Password { get; set; }

        public string PasswordRepeat { get; set; }
    }
}
