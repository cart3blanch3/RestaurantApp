using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AdminCredentials _adminCredentials;

    public AdminController(IOptions<AdminCredentials> adminCredentials)
    {
        _adminCredentials = adminCredentials.Value;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] AdminCredentials model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (model.Username == _adminCredentials.Username &&
            model.Password == _adminCredentials.Password)
        {
            return Ok("Вы успешно аутентифицированы.");
        }
        else
        {
            return Unauthorized("Неверные учетные данные.");
        }
    }
}
