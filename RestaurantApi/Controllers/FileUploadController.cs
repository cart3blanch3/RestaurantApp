using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace RestaurantApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public FileUploadController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost("upload-category-image")]
    public async Task<IActionResult> UploadCategoryImage(IFormFile file)
    {
        if (file != null && file.Length > 0)
        {
            var path = Path.Combine(_environment.WebRootPath, "categories", file.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(new { Path = $"/categories/{file.FileName}" });
        }
        return BadRequest("No file uploaded.");
    }

    [HttpPost("upload-dish-image")]
    public async Task<IActionResult> UploadDishImage(IFormFile file)
    {
        if (file != null && file.Length > 0)
        {
            var path = Path.Combine(_environment.WebRootPath, "dishes", file.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(new { Path = $"/dishes/{file.FileName}" });
        }
        return BadRequest("No file uploaded.");
    }
}
