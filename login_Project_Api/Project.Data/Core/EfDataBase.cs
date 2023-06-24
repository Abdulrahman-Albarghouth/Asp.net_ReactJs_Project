using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Entity;
using System;
using System.Linq;
using System.Linq.Expressions;
using static Project.Core.ServiceResult;

namespace Project.Data
{
    public class EfDataBase<T> where T : class, IEntity, new()
    {

        protected readonly DbContext context;
        public EfDataBase(DbContext context) => this.context = context;

        // Get Single Entity
        public virtual T Get(Expression<Func<T, bool>> filter)
            => context.Set<T>().FirstOrDefault(filter);

        public virtual T GetByID(int ID)
            => context.Set<T>().Find(ID);

        // Get Multiple Entity
        public virtual IQueryable<T> GetAll()
            => context.Set<T>();

        public virtual IQueryable<T> GetAll(Expression<Func<T, bool>> filter)
            => (filter == null) ? context.Set<T>() : context.Set<T>().Where(filter);

        // Count
        public virtual int Count(Expression<Func<T, bool>> filter = null)
            => (filter == null) ? context.Set<T>().Count() : context.Set<T>().Count(filter);


        // Create
        public virtual ServiceResult<T> Add(T entity, bool save = true)
        {
            try
            {
                // Check validation
                if (!GeneralFn.ValidateModel(entity))
                    return new ServiceResult<T>
                    {
                        Status = false,
                        ErrorCode = ErrorCodes.ValidationError,
                        ErrorMessage = "Data is not valid! Please check required parameters.",
                        Data = entity
                    };
             
                context.Set<T>().Add(entity);
                if (save) context.SaveChanges();
                return new ServiceResult<T>() { Data = entity };

            }
            catch (Exception exp)
            {
                return new ServiceResult<T>
                {
                    Status = false,
                    ErrorMessage = exp.Message,
                    ErrorCode = ErrorCodes.GeneralServisError,
                    Data = entity
                };
            }
        }

        // Update
        public virtual ServiceResult Update(T entity, bool save = true)
        {
            try
            {
                // Check Valid ID
                if (GetByID(entity.ID) == null)
                    return new ServiceResult
                    {
                        Status = false,
                        ErrorCode = ErrorCodes.InvalidId,
                        ErrorMessage = "Not Found!"
                    };

                // Check Validation
                
                if (!GeneralFn.ValidateModel(entity))
                    return new ServiceResult
                    {
                        Status = false,
                        ErrorCode = ErrorCodes.ValidationError,
                        ErrorMessage = "Data is not valid! Please check required parameters."
                    };
                
                context.Set<T>().Update(entity);
                if (save) context.SaveChanges();
                return new ServiceResult
                {
                    Status = true,
                    ErrorMessage = "Updated successfully.",
                    ErrorCode = ServiceResult.ErrorCodes.Success
                }; ;

            }
            catch (Exception exp)
            {
                return new ServiceResult
                {
                    Status = false,
                    ErrorMessage = exp.Message,
                    ErrorCode = ServiceResult.ErrorCodes.GeneralServisError
                };
            }
        }

        // Delete
        public virtual ServiceResult DeleteByID(int? ID, bool save = true)
        {
            try
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
                if (GetByID((int)ID) == null)
                    return new ServiceResult
                    {
                        Status = false,
                        ErrorCode = ErrorCodes.InvalidId,
                        ErrorMessage = "Not Found!"
                    };

                context.Set<T>().Remove(this.GetByID((int)ID));
                if (save) context.SaveChanges();
                return new ServiceResult();
            }
            catch (Exception exp)
            {
                return new ServiceResult
                {
                    Status = false,
                    ErrorMessage = exp.Message,
                    ErrorCode = ServiceResult.ErrorCodes.GeneralServisError
                };
            }
        }
    }
}
