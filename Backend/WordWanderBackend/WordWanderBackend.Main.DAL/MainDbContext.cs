using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.DAL
{
    public class MainDbContext: DbContext //, IUserStore<UserDbModel>
    {
        public DbSet<BookDbModel> Books { get; set; }
        public DbSet<UserDbModel> Users { get; set; }
        public DbSet<DictionaryDbModel> Dictionary { get; set; }
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserDbModel>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            modelBuilder.Entity<UserDbModel>()
                .Property(u => u.PrefferedFontSize)
                .HasDefaultValue(12);     
        }
    }
}
