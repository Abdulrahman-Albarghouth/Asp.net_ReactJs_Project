using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using torholding_test.Models;
using Project.Bussiness;

namespace torholding_test.Controllers
{

    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LogicService _logic;
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration, LogicService logic)
        {
            _configuration = configuration;
            _logic = logic;
        }

        public ActionResult<object> Authenticate([FromBody] LoginRequest login)
        {
            var loginResponse = new LoginResponse { };
            LoginRequest loginrequest = new()
            {
                EMail = login.EMail.ToLower(),
                Password = login.Password
            };

            var result = _logic.User.UserLogin(loginrequest.EMail, loginrequest.Password);

            if (result.Status)
            {
                string token = CreateToken(loginrequest.EMail);

                loginResponse.Token = token;
                loginResponse.responseMsg = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };


                return Ok(new { loginResponse, result });
            }
            else
            {
                
                return Ok(new { result });
            }
        }

        private string CreateToken(string EMail)
        {

            List<Claim> claims = new()
            {                    
                //list of Claims - we only checking username - more claims can be added.
                new Claim("eMail", Convert.ToString(EMail)),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
