namespace RestaurantApi.Models;

public class OrderRequest
{
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string DeliveryMethod { get; set; }
    public List<OrderItem> Items { get; set; }
    public string AdditionalInfo { get; set; }
}

public class OrderItem
{
    public string Name { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
