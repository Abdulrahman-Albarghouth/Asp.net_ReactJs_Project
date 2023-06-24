using Project.Data.Concrete.DAL;
using System;

namespace Project.Data
{
    public class DatabaseService : IDisposable
    {
        // -- DATABASE --
        private readonly EfProjectContext context;
        public DatabaseService(EfProjectContext context) => this.context = context;

        // -- FIELDS --

        // .user
        private EFUser user;
        
        // -- PROPERTIES --

        // .user
        public EFUser User => user ??= new EFUser(context);
        
        // -- OTHER METHODS --

        public void Dispose() => context.Dispose();
        public int SaveChanges() => context.SaveChanges();
    }
}
