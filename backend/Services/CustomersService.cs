using ClientNudge.Api.Data;
using ClientNudge.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientNudge.Api.Services;

public class CustomersService
{
    private readonly AppDbContext _context;

    public CustomersService(AppDbContext context)
    {
        _context = context;
    }

    // Get customers from DB based on logged in user
    public async Task<List<Customer>> GetCustomersAsync(Guid ownerUserId)
    {
        return await _context.Customers
                .Where(customer => customer.OwnerUserId == ownerUserId)
                .ToListAsync();
    }

    // Insert Customer to DB
    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }
}