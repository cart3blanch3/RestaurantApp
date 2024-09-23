using Microsoft.AspNetCore.Mvc;
using RestaurantApi.Models;
using RestaurantApi.Services;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public OrderController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("place-order")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subject = "Новый запрос на заказ";
            var items = string.Join("\n", request.Items.Select(i => $"{i.Name} - {i.Quantity} x {i.Price}"));
            var body = $"Имя: {request.Name}\nТелефон: {request.Phone}\nАдрес: {request.Address}\nДоставка/Самовывоз: {request.DeliveryMethod}\nЗаказанные товары:\n{items}\nAdditional Дополнительная информация: {request.AdditionalInfo}";

            try
            {
                await _emailService.SendEmailAsync("sergei05037@gmail.com", subject, body);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
