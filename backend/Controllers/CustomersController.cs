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

    // Get Customers based on logged in user
    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userId, out var ownerUserId))
        {
            return Unauthorized();
        }
        var customers = await _customersService.GetCustomersAsync(ownerUserId);
        return Ok(customers);
    }

    // Get Specific Customer using Id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSingleCustomer(long id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userId, out var ownerUserId))
        {
            return Unauthorized();
        }
        var customer = await _customersService.GetSpecificCustomerAsync(id, ownerUserId);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
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