using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;

namespace Project.Entity
{
    public class User : EntityBase
    {
      

        [DisplayName("User Type")]
        public int UserType { get; set; } = 1;

        [DisplayName("Name"), MinLength(2, ErrorMessage = "The Name must be with a at least '2' character."), MaxLength(30, ErrorMessage = "The Name must be less than '30' character."), Required]
        public string Name { get; set; }

        [DisplayName("Surname"), MinLength(2), MaxLength(30), Required]
        public string Surname { get; set; }

        [DisplayName("Phone Number"), MinLength(10), MaxLength(15), RegularExpression("^[+]{0,1}\\d{10,15}$", ErrorMessage = "The phone number must be between 10 and 15 digit!")]
        public string Phone { get; set; }
        
        [DisplayName("Email"), Required, RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z.]{2,}$", ErrorMessage = "Please make sure to insert email address!")]
        public string EMail { get; set; }

        [DisplayName("Password"), Required, MinLength(8), DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Repeat Password"), Required, MinLength(8), DataType(DataType.Password), Compare(nameof(Password))]
        public string PasswordRepeat { get; set; }

        public string? RememberMe { get; set; }


    }
}