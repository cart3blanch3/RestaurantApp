using Microsoft.EntityFrameworkCore;
using RestaurantApi.Models;

namespace RestaurantApi.Data;

public class RestaurantContext : DbContext
{
    public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>()
            .Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<Category>()
            .Property(c => c.ImageUrl)
            .HasMaxLength(255);

        modelBuilder.Entity<MenuItem>()
            .Property(m => m.Name)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<MenuItem>()
            .Property(m => m.Description)
            .HasMaxLength(1000);

        modelBuilder.Entity<MenuItem>()
            .Property(m => m.Price)
            .IsRequired();

        modelBuilder.Entity<MenuItem>()
            .Property(m => m.ImageUrl)
            .HasMaxLength(255);

        modelBuilder.Entity<MenuItem>()
            .HasOne(m => m.Category)
            .WithMany()
            .HasForeignKey(m => m.CategoryId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
