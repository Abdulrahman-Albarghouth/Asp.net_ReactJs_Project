using Project.Core;
using Project.Data.Concrete.DAL;
using Project.Entity;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using static Project.Core.ServiceResult;

namespace Project.Data
{
    public class EFUser : EfDataBase<User>
    {

        private readonly EfProjectContext db;
        public EFUser(EfProjectContext context) : base(context) => db = context;

        // ADD
        // --- Unique Property >> EMail
        public override ServiceResult<User> Add(User entity, bool save = true)
        {
            if (entity.EMail != null)
                entity.EMail = entity.EMail.Trim();

            // Check Validation
            if (!GeneralFn.ValidateModel(entity))
                return new ServiceResult<User>
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "Data is not valid! Please check required parameters.",
                    Data = entity
                };

            // Check unique property
            if (db.Users.Count(k => k.EMail == entity.EMail) != 0)
                return new ServiceResult<User>
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "This email is used before, please use another email address.",
                    Data = entity
                };

            // Check Password Length
            if (entity.Password.Length == 64)
                return new ServiceResult<User>
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "Password cannot be 64 character long!",
                    Data = entity
                };

            // HASH Password
            var hashed = HashFn.HashPassword(entity.Password);
            entity.Password = entity.PasswordRepeat = hashed;

            return base.Add(entity, save);
        }

        // UPDATE
        // --- Unique Property >> EMail
        public override ServiceResult Update(User entity, bool save = true)
        {
            // Check Valid ID
            if (db.Users.FirstOrDefault(k => k.ID == entity.ID) == null)
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ErrorCodes.InvalidId,
                    ErrorMessage = "Not found !"
                };

            // Check Validation
            if (!GeneralFn.ValidateModel(entity))
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "Data is not valid! Please check required parameters."
                };

            // Check unique property
            if (db.Users.Count(k => k.EMail == entity.EMail && k.ID != entity.ID) != 0)
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "This email is used before, please use another email address."
                };

            // HASH Password
            if (entity.Password.Length != 118)
            {
                var hashed = HashFn.HashPassword(entity.Password);
                entity.Password = entity.PasswordRepeat = hashed;
            }

            return base.Update(entity, save);
        }

        // DELETE
        public override ServiceResult DeleteByID(int? ID, bool save = true)
        {
            // int? control
            if (ID == null)
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ErrorCodes.ValidationError,
                    ErrorMessage = "Not Valid ID!"
                };

            // Check Valid ID
            User user = GetByID((int)ID);
            if (user == null)
                return new ServiceResult
                {
                    Status = false,
                    ErrorCode = ErrorCodes.InvalidId,
                    ErrorMessage = "Not Found!"
                };

            // Delete >> User
            return base.DeleteByID(ID, save);
        }
    }
}
