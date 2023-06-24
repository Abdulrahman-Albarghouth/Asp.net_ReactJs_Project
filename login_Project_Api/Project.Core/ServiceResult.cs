namespace Project.Core
{
    public class ServiceResult
    {
        public enum ErrorCodes
        {
            Success = 200,

            InvalidId = 204,            // Do not add to database
            ValidationError = 422,      // Do not add to database
            MissingArgument = 400,      // Do not add to database
            Unauthorized = 401,         // Do not add to database

            GeneralServisError = 900,   // Add to database
            UnavailableServis = 503,   // Add to database
        }

        public bool Status { get; set; } = true;
        public ErrorCodes ErrorCode { get; set; } = ErrorCodes.Success;
        public string? ErrorMessage { get; set; } = "Successful";
    }

    public class ServiceResult<T> : ServiceResult
    {
        public T? Data { get; set; }
    }
}
