using System;
using Microsoft.EntityFrameworkCore;
using Project.Entity;

namespace Project.Data.Concrete.DAL
{
    public class EfProjectContext : DbContext
    {

        public EfProjectContext(DbContextOptions<EfProjectContext> options) : base(options) { }

        // User
        public DbSet<User> Users { get; set; }
    }
}
