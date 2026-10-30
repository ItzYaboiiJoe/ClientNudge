using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientNudge.Api.Services;
using Microsoft.AspNetCore.Authorization;
using ClientNudge.Api.Models;
using System.Security.Claims;

namespace ClientNudge.Api.Controllers;

[Route("api/customers")]
[ApiController]
[Authorize]
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

    // Create a customer post
    [HttpPost]
    public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomer request)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userId, out var ownerUserId))
        {
            return Unauthorized();
        }
        var customer = new Customer
        {
            OwnerUserId = ownerUserId,
            Name = request.Name,
            Phone = request.Phone,
            Email = request.Email,
            Address = request.Address,
            Notes = request.Notes,
        };
        var createdCustomer = await _customersService.CreateCustomerAsync(customer);
        return Ok(createdCustomer);
    }
}