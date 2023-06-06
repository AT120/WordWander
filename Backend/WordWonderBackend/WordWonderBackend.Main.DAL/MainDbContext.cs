using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWonderBackend.Main.DAL.Models;

namespace WordWonderBackend.Main.DAL
{
    public class MainDbContext: DbContext
    {
        public DbSet<BookDbModel> Books { get; set; }
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }
    }
}
