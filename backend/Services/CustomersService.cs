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

    // Get customers from DB based on ID
    public async Task<Customer?> GetSpecificCustomerAsync(long id, Guid ownerUserId)
    {
        return await _context.Customers
                .Where(customer => customer.Id == id && customer.OwnerUserId == ownerUserId)
                .FirstOrDefaultAsync();
    }

    // Insert Customer to DB
    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }

    // Update a customer info using ownerUserId and customer Id
    public async Task<bool> EditCustomerAsync(long id, Guid ownerUserId, EditCustomer request)
    {
        var rowsUpdated = await _context.Customers
            .Where(customer => customer.Id == id && customer.OwnerUserId == ownerUserId)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(customer => customer.Name, request.Name)
                .SetProperty(customer => customer.Phone, request.Phone)
                .SetProperty(customer => customer.Email, request.Email)
                .SetProperty(customer => customer.Address, request.Address)
                .SetProperty(customer => customer.Notes, request.Notes)
                .SetProperty(customer => customer.Status, request.Status)
                .SetProperty(customer => customer.UpdatedAt, DateTime.UtcNow));

        return rowsUpdated > 0;
    }

    // Delete a customer using ownerUserId and customer Id
    public async Task<Customer?> DeleteCustomerAsync(long id, Guid ownerUserId)
    {
        var customer = await GetSpecificCustomerAsync(id, ownerUserId);

        var rowsDeleted = await _context.Customers
            .Where(customer => customer.Id == id && customer.OwnerUserId == ownerUserId)
            .ExecuteDeleteAsync();

        return rowsDeleted > 0 ? customer : null;
    }
}