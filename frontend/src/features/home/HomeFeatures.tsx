import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, CalendarClock } from "lucide-react";

const HomeFeatures = () => {
  return (
    <div id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Everything You Need to Stay Organized
        </h2>

        <p className="mt-4 text-muted-foreground">
          Simple tools to help you manage customers and grow your business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Users className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>

          <CardContent className="text-muted-foreground">
            Keep customer contact information, notes, and history organized in
            one place.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Lead Tracking</CardTitle>
          </CardHeader>

          <CardContent className="text-muted-foreground">
            Track every opportunity from the first conversation to a won or lost
            deal.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CalendarClock className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Follow-Up Reminders</CardTitle>
          </CardHeader>

          <CardContent className="text-muted-foreground">
            Schedule follow-ups and easily see which customers need your
            attention.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeFeatures;
