using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Project.Bussiness;
using Project.Data;
using Project.Data.Concrete.DAL;
using Project.Entity;
using System;


namespace torholding_test

{
    public class Startup
    {

        private readonly IConfiguration conf;
        private readonly IWebHostEnvironment env;

        public Startup(IConfiguration conf, IWebHostEnvironment env)
        {
            this.conf = conf;
            this.env = env;
        }



        
        public void ConfigureServices(IServiceCollection services)
        {

            services.Configure<FormOptions>(x => {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue;
                x.MultipartHeadersLengthLimit = int.MaxValue;
            });

            // DATABASE CONFIGURATION
            services.ConfigureDatabaseServices(conf, env);
            
            services.Configure<ForwardedHeadersOptions>(options => {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                services.AddCors();
            });

            // SERVICES
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ITempDataProvider, SessionStateTempDataProvider>();

            services.AddScoped<DatabaseService>();
            services.AddScoped<LogicService>();

          
            // SETTINGS
            services.AddMemoryCache();
            services.AddSession(option => {
                option.IdleTimeout = TimeSpan.FromHours(4);
            });
            services.AddResponseCompression(option => {
                option.Providers.Add<GzipCompressionProvider>();
                option.EnableForHttps = true;
                option.MimeTypes = StartupConfigurations.MimeTypes;
            });

            // HANGFIRE

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options => {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                ;
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, EfProjectContext db)
        {
            app.UseCors(options => options.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            );
       
            // SETTINGS
            app.UseHttpsRedirection();
            app.UseForwardedHeaders();

            // EXCEPTION & STATUS PAGES
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseStatusCodePagesWithRedirects("/{0}");

            // COMPRESSION & STATIC FILES
            app.UseResponseCompression();
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx => {
                    const int durationInSeconds = 60 * 60 * 24 * 365;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            });

            // SESSION
            app.UseSession();

     
            // MVC Mapping
            app.UseRouting();
            app.UseAuthorization();
            app.UseHttpsRedirection();

            app.UseEndpoints(routes => {
                routes.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                    );

                routes.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}"
                   );
            });
       
        } 
    }
}
