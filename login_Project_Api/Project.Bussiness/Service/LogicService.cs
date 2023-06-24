using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Project.Data;

namespace Project.Bussiness
{
    public class LogicService
    {

        private readonly DatabaseService dbService;

        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ITempDataProvider tempDataProvider;

        public LogicService(
            DatabaseService dbService,

            IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor,
            ITempDataProvider tempDataProvider)
        {
            this.dbService = dbService;

            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
            this.tempDataProvider = tempDataProvider;
        }

        private UserManager user;

        public UserManager User => user ??= new UserManager(this, dbService, env);

    }
}
