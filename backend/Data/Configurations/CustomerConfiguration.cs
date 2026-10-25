using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ClientNudge.Api.Models;

namespace ClientNudge.Api.Data.Configuration;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("customers", "public");
        builder.HasKey(customer => customer.Id);

        builder.Property(customer => customer.Id).HasColumnName("id");
        builder.Property(customer => customer.OwnerUserId).HasColumnName("owner_user_id");
        builder.Property(customer => customer.Name).HasColumnName("name");
        builder.Property(customer => customer.Phone).HasColumnName("phone");
        builder.Property(customer => customer.Email).HasColumnName("email");
        builder.Property(customer => customer.Address).HasColumnName("address");
        builder.Property(customer => customer.Notes).HasColumnName("notes");
        builder.Property(customer => customer.Status).HasColumnName("status");
        builder.Property(customer => customer.CreatedAt).HasColumnName("created_at");
        builder.Property(customer => customer.UpdatedAt).HasColumnName("updated_at");
    }
}
