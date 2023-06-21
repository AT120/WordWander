using Microsoft.EntityFrameworkCore;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.DAL
{
    public class MainDbContext: DbContext
    {
        public DbSet<BookDbModel> Books { get; set; }
        public DbSet<UserDbModel> Users { get; set; }
        public DbSet<DictionaryDbModel> Dictionary { get; set; }
        public DbSet<InvitationDbModel> Invations { get; set; }
        public DbSet<GroupDbModel> Groups { get; set; }
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<GroupDbModel>()
            .HasMany(g => g.Students)
            .WithMany(u => u.UserGroups)
            .UsingEntity(j => j.ToTable("GroupStudents"));

            modelBuilder.Entity<GroupDbModel>()
            .HasOne(g => g.Teacher)
            .WithMany(u=>u.TeacherGroups)
            .HasForeignKey(g => g.TeacherId);


            modelBuilder.Entity<InvitationDbModel>()
            .HasOne(g => g.Invited)
            .WithMany(u => u.Invations)
            .HasForeignKey(g => g.InvitedId);

            modelBuilder.Entity<UserDbModel>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            modelBuilder.Entity<UserDbModel>()
                .Property(u => u.PrefferedFontSize)
                .HasDefaultValue(12);     
        }

        public async Task<bool> AnyCommonGroup(Guid studentId, Guid teacherId)
        {
            return await Users
                .Where(u => u.Id == studentId)
                .AnyAsync(u => 
                    u.UserGroups.Any(g => g.TeacherId == teacherId)
                );
        }
    }
}
