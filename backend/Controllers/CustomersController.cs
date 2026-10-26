using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientNudge.Api.Controllers;

[Route("api/customers")]
[ApiController]
public class CustomersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCustomers()
    {
        return Ok("Customers endpoint working!");
    }
}
