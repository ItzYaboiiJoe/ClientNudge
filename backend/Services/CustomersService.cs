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

    public async Task<List<Customer>> GetCustomersAsync()
    {
        return await _context.Customers.ToListAsync();
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }
}