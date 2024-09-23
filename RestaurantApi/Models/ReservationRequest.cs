namespace RestaurantApi.Models;

public class ReservationRequest
{
    public string Name { get; set; }
    public string Phone { get; set; }
    public int People { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string AdditionalInfo { get; set; }
}
