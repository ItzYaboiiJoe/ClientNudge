import { Card, CardContent } from "@/components/ui/card";

const LeadsStats = () => {
  // Fake Data
  const stats = [
    { label: "Total Leads", value: 48 },
    { label: "Open", value: 12 },
    { label: "In Progress", value: 18 },
    { label: "Won", value: 11 },
    { label: "Lost", value: 7 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-5">
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

export default LeadsStats;
