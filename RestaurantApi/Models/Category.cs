using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Models;

public class Category
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [StringLength(255)]
    public string ImageUrl { get; set; }  
}
