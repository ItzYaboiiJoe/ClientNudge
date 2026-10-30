import { Card, CardContent } from "@/components/ui/card";
import type { CustomerType } from "./backend/getCustomers";

const CustomersStats = ({ customers }: { customers: CustomerType[] }) => {
  const todayDate = new Date();
  const stats = [
    { label: "Total Customers", value: customers.length },
    {
      label: "Active Customers",
      value: customers.filter((customer) => customer.status).length,
    },
    {
      label: "New This Month",
      value: customers.filter((customer) => {
        const createdAt = new Date(customer.createdAt);
        return (
          createdAt.getUTCMonth() === todayDate.getUTCMonth() &&
          createdAt.getUTCFullYear() === todayDate.getUTCFullYear()
        );
      }).length,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card className="shadow-xl" key={stat.label}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomersStats;
