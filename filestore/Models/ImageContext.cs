using Microsoft.EntityFrameworkCore;

namespace filestore.Models
{
    public class ImageContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseSerialColumns();
        }

        public ImageContext(DbContextOptions<ImageContext> options):base(options)
        {}

        public DbSet<Image> Images { get; set; }
    }
}