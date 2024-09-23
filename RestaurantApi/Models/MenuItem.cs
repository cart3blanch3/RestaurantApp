using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Models;

public class MenuItem
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Price { get; set; }  

    [StringLength(255)]
    public string ImageUrl { get; set; }

    [Required]
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}
