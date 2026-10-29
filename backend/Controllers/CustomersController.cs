using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientNudge.Api.Services;

namespace ClientNudge.Api.Controllers;

[Route("api/customers")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly CustomersService _customersService;

    public CustomersController(CustomersService customersService)
    {
        _customersService = customersService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await _customersService.GetCustomersAsync();

        return Ok(customers);
    }
}