import {
  LayoutDashboard,
  Users,
  Target,
  CalendarClock,
  Settings,
} from "lucide-react";

export const APP_NAME = "ClientNudge";
export const backendUrl = "http://localhost:5203";
export const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Leads", url: "/leads", icon: Target },
  { title: "Follow-Ups", url: "/follow-ups", icon: CalendarClock },
  { title: "Settings", url: "/settings", icon: Settings },
];
