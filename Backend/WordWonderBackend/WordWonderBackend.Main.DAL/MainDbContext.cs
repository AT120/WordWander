using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WordWonderBackend.Main.DAL.Models;

namespace WordWonderBackend.Main.DAL
{
    public class MainDbContext: DbContext //, IUserStore<UserDbModel>
    {
        public DbSet<BookDbModel> Books { get; set; }
        public DbSet<UserDbModel> Users { get; set; }
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserDbModel>()
                .HasIndex(u => u.UserName)
                .IsUnique();
        }

        // public Task<string> GetUserIdAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     return Task.FromResult(user.Id.ToString());
        // }

        // public Task<string?> GetUserNameAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     return Task.FromResult<string?>(user.UserName); 
        // }

        // public async Task SetUserNameAsync(UserDbModel user, string? userName, CancellationToken cancellationToken)
        // {
        //     user.UserName = userName ?? throw new ArgumentNullException(nameof(userName));
        //     await Users.AddAsync(user, cancellationToken);
        //     await SaveChangesAsync(cancellationToken);
        // }

        // public Task<string?> GetNormalizedUserNameAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     throw new NotImplementedException();
        // }

        // public Task SetNormalizedUserNameAsync(UserDbModel user, string? normalizedName, CancellationToken cancellationToken)
        // {
        //     throw new NotImplementedException();
        // }

        // public async Task<IdentityResult> CreateAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     await Users.AddAsync(user, cancellationToken);
        //     try 
        //     {
        //         await SaveChangesAsync(cancellationToken);
        //         return IdentityResult.Success;
        //     }
        //     catch
        //     {
        //         return IdentityResult.Failed();
        //     }
        // }

        // public Task<IdentityResult> UpdateAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     throw new NotSupportedException();
        // }

        // public async Task<IdentityResult> DeleteAsync(UserDbModel user, CancellationToken cancellationToken)
        // {
        //     Users.Remove(user);
        //     try {
        //         await SaveChangesAsync(cancellationToken);
        //         return IdentityResult.Success;
        //     }
        //     catch
        //     {
        //         return IdentityResult.Failed();
        //     }
        // }

        // public Task<UserDbModel?> FindByIdAsync(string userId, CancellationToken cancellationToken)
        // {
        //     return FindByIdAsync(Guid.Parse(userId), cancellationToken);
        // }
        
        // public async Task<UserDbModel?> FindByIdAsync(Guid userId, CancellationToken cancellationToken)
        // {
        //     return await Users.FindAsync(new object?[] { userId }, cancellationToken: cancellationToken);
        // }

        // public async Task<UserDbModel?> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        // {
        //     return await Users.FirstOrDefaultAsync(u => u.UserName == normalizedUserName, cancellationToken);
        // }
    }
}
