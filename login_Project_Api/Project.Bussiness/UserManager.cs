using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Data;
using Project.Entity;
using System;
using System.Linq.Expressions;
using static Project.Core.ServiceResult;

namespace Project.Bussiness
{
    public class UserManager 
    {

        private readonly LogicService logicService;
        private readonly DatabaseService dbService;

        private readonly IWebHostEnvironment env;

        public UserManager(LogicService logicService, DatabaseService dbService, IWebHostEnvironment env)
        {
            this.logicService = logicService;
            this.dbService = dbService;

            this.env = env;
        }

        // GET FUNCTIONS

        public User GetUser(Expression<Func<User, bool>> filter = null)
        {
            return dbService.User.GetAll(filter)
                .FirstOrDefault();
        }

        public User GetUser(int UserID)
        {
            return GetUser(k => k.ID == UserID);
        }

        public IQueryable<User> GetUserList(Expression<Func<User, bool>> filter = null)
        {
            return dbService.User.GetAll(filter);
        }

        // CREATE FUNCTIONS

        public ServiceResult<User> CreateUser(User user)
        {

            // Create User
           int id = dbService.User.GetAll().OrderByDescending(e => e.ID).FirstOrDefault().ID;
            user.ID = id+1;   
            var result = dbService.User.Add(user);
            if (!result.Status) return result;


            return result;
        }

        public void CreateDefaultUsers()
        {
            var user = new User()
            {
                Password = "12345678",
                PasswordRepeat = "12345678",
                Surname = "(Test User)",
            };

            if (dbService.User.Count(k => k.UserType == 1) == 0)
            {
                user.UserType = 1;
                user.EMail = "admin@test.com";
                user.Name = "Admin";

                var result = CreateUser(user);
            }

        }

        // LOGIN FUNCTIONS

        public ServiceResult<User> UserLogin(string email, string password)
        {
            // Get User
            email = email != null ? email.Trim() : null;
            User user = dbService.User.GetAll(k => k.EMail == email).FirstOrDefault();

            if (user == null || !HashFn.CheckPassword(user.Password, password))
                return new ServiceResult<User>
                {
                    Status = false,
                    ErrorMessage = "Email or Password is not correct!"
                };

            return new ServiceResult<User>
            {
                Status = true,
                ErrorMessage = "Successful login, redirecting to homepage...",
                Data = user
            };
        }

        public ServiceResult<User> UserLogout(User user)
        {
            if (user == null) return new ServiceResult<User> { Data = new User() };

            var dbUser = GetUser(user.ID);
            dbUser.RememberMe = null;
            UpdateUser(dbUser);

            return new ServiceResult<User>() { Data = dbUser };
        }

        public bool CheckRememberValue(string rememberValue)
        {
            return !string.IsNullOrEmpty(rememberValue) && dbService.User.Count(k => k.RememberMe == rememberValue) == 0;
        }

        // UPDATE FUNCTIONS
        public ServiceResult UpdateUser(User user)
        {
            ServiceResult result = new ServiceResult();
            User update_user = dbService.User.GetByID(user.ID);
            if (user.EMail != null)
                update_user.EMail = user.EMail;
            if (user.Name != null)
                update_user.Name = user.Name;
            if (user.Surname != null)
                update_user.Surname = user.Surname;
            if (user.Phone != null)
                update_user.Phone = user.Phone;
            if (user.Password != null)
                update_user.Password = user.Password;
            if (user.PasswordRepeat != null)
                update_user.PasswordRepeat = user.PasswordRepeat;

            // Check Password Length
            if (update_user.Password.Length == 64)
                return new ServiceResult<User>
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "Password cannot be 64 character long!",
                    Data = update_user
                };

            // HASH Password
            var hashed = HashFn.HashPassword(update_user.Password);
            update_user.Password = update_user.PasswordRepeat = hashed;



            result = dbService.User.Update(update_user);
            return result;
        }

        public ServiceResult ChangeUserPassword(int? userID, string oldPassword, string newPassword, string passwordConfirm)
        {
            User user = GetUser(userID ?? 0);
            if (userID == null || user == null)
                return new ServiceResult()
                {
                    Status = false,
                    ErrorCode = ServiceResult.ErrorCodes.InvalidId,
                    ErrorMessage = "User couldn't find!"
                };

            if (string.IsNullOrEmpty(oldPassword))
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ServiceResult.ErrorCodes.ValidationError,
                    ErrorMessage = "Old password cannot be empty!"
                };

            if (string.IsNullOrEmpty(newPassword) || newPassword != passwordConfirm)
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ServiceResult.ErrorCodes.ValidationError,
                    ErrorMessage = "New passwords are not match with each other!"
                };

            if (!HashFn.CheckPassword(user.Password, oldPassword))
                return new ServiceResult()
                {
                    Status = false,
                    ErrorCode = ServiceResult.ErrorCodes.ValidationError,
                    ErrorMessage = "Current password is not correct!"
                };

            user.Password = newPassword;
            user.PasswordRepeat = passwordConfirm;
            return UpdateUser(user);
        }

        // Delete User 
        public ServiceResult delete_user(int Id)
        {
            return dbService.User.DeleteByID(Id);
        }

    }
}
