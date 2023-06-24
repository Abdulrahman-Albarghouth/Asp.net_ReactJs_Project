using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Project.Data.Concrete.DAL;
using System;
using System.Collections.Generic;
using System.Globalization;
using Project.Data;



namespace torholding_test
{
    public static class StartupConfigurations
    {
        public static readonly IEnumerable<string> MimeTypes = new[]
        {
            // General
            "text/plain",

            // Static files
            "text/css",
            "application/javascript",

            // MVC
            "text/html",
            "application/xml",
            "text/xml",
            "application/json",
            "text/json",
        };

        public static void ConfigureDatabaseServices(this IServiceCollection services, IConfiguration Configuration, IWebHostEnvironment env)
        {
            string connectionStr = Configuration.GetConnectionString("PostgreSQL");
                services.AddDbContext<EfProjectContext>(option => option.UseNpgsql(connectionStr));
        }


 

        public static void ConfigureCultureSettings(this IApplicationBuilder app)
        {
            CultureInfo culture = (CultureInfo)CultureInfo.InvariantCulture.Clone();
            culture.DateTimeFormat.ShortDatePattern = "dd MMM yyyy";
            culture.DateTimeFormat.LongTimePattern = "HH:mm";
            culture.NumberFormat.NumberDecimalSeparator = ".";
            culture.NumberFormat.CurrencyDecimalSeparator = ",";

            CultureInfo.DefaultThreadCurrentCulture = culture;
            CultureInfo.DefaultThreadCurrentUICulture = culture;
        }
    }
}
