using Microsoft.AspNetCore.Mvc;
using Project.Entity;
using System;
using System.Linq.Expressions;
using Project.Bussiness;
using torholding_test.Models;

[ApiController]
public class UserController : ControllerBase
{
    private readonly LogicService _logic;

    public UserController(LogicService logic)
    {
        _logic = logic;
    }

    [Route("users")]
    [HttpGet]
    public IActionResult GetUserList()
    {
        Expression<Func<User, bool>> filter = null;
        var userList = _logic.User.GetUserList();
        var success = 200;
        var messages = "Successful";
        var status = true;
        return Ok(new { messages, success, status, userList });
    }

    [Route("user/{id}")]
    [HttpDelete]
    public IActionResult delete_user(int id)
    {
        var result = _logic.User.delete_user(id);

        return Ok(result);
    }


    [Route("user")]
    [HttpPut]
    public IActionResult UpdateUser(VM_User user)
    {

        User entity = new User()
        {
            ID =  user.ID,
            Name = user.Name,
            Phone = user.Phone,
            Surname = user.Surname,
            EMail = user.EMail,
            Password = user.Password,
            PasswordRepeat = user.PasswordRepeat,

        };
             
        var result = _logic.User.UpdateUser(entity);

        return Ok(result);
    }


    [Route("user/{id}")]
    [HttpGet]
    public IActionResult GetUser(int id)
    {

        var user = _logic.User.GetUser(id);

        return Ok(user);
    }

    [Route("user")]
    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        var result = _logic.User.CreateUser(user);

        return Ok(result);
    }


}