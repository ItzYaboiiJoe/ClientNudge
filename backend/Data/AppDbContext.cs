using Microsoft.EntityFrameworkCore;

namespace ClientNudge.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
