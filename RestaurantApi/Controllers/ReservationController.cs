using Microsoft.AspNetCore.Mvc;
using RestaurantApi.Models;
using RestaurantApi.Services;

namespace RestaurantApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationController : ControllerBase
{
    private readonly IEmailService _emailService;

    public ReservationController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("reserve")]
    public async Task<IActionResult> ReserveTable([FromBody] ReservationRequest request)
    {
        var subject = "Новый запрос на резервирование";
        var body = $"Имя: {request.Name}\nТелефон: {request.Phone}\nКол-во человек: {request.People}\nДата: {request.Date}\nВремя: {request.Time}\nДополнительная информация: {request.AdditionalInfo}";

        await _emailService.SendEmailAsync("sergei05037@gmail.com", subject, body);
        return Ok();
    }
}
