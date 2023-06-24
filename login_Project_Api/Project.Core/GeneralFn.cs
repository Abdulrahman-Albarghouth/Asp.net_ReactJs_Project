using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Project.Core
{
    public static class GeneralFn
    {
        public static bool ValidateModel(object model)
        {
            var context = new ValidationContext(model, serviceProvider: null, items: null);
            var results = new List<ValidationResult>();
            return Validator.TryValidateObject(model, context, results, true);
        }

        public static string CreateRandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static void CreateFolderIfNotExists(string path)
        {
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);
        }

        public static void SetJson<T>(this ISession session, string key, T value)
        {
            JsonSerializerSettings js = new JsonSerializerSettings();
            js.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            session.SetString(key, JsonConvert.SerializeObject(value, settings: js));
        }

        public static T GetJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }

        public static DateTime GetFirstDateOfCurrentMonth()
        {
            return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        }

        public static DateTime GetLastDateOfCurrentMonth()
        {
            var now = DateTime.Now;
            return new DateTime(now.Year, now.Month, DateTime.DaysInMonth(now.Year, now.Month)).AddHours(23).AddMinutes(59);
        }
    }
}
