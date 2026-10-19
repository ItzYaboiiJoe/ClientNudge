import { Card, CardContent } from "@/components/ui/card";

// Fake Stats (Placeholder)
const stats = [
  { label: "Total Customers", value: 24 },
  { label: "Active Customers", value: 18 },
  { label: "New This Month", value: 6 },
];

const CustomersStats = () => {
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
