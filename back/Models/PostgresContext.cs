using Microsoft.EntityFrameworkCore;

namespace back.Models
{
    public class PosgresContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseSerialColumns();
        }

        public PosgresContext(DbContextOptions<PosgresContext> options):base(options)
        {}

        public DbSet<Person> Persons { get; set; }
    }
}