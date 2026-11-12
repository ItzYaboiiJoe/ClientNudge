import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";

// Fake Data
const leads = [
  {
    id: 1,
    name: "Website Redesign",
    customer: "Sarah Johnson",
    follow_up_date: "Nov 14, 2026",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Software Subscription",
    customer: "David Miller",
    follow_up_date: "Nov 12, 2026",
    status: "Open",
  },
  {
    id: 3,
    name: "Mobile Application",
    customer: "Emily Davis",
    follow_up_date: "Nov 10, 2026",
    status: "Won",
  },
  {
    id: 4,
    name: "IT Consulting",
    customer: "Robert Wilson",
    follow_up_date: "",
    status: "Lost",
  },
  {
    id: 5,
    name: "Website Maintenance",
    customer: "Jessica Brown",
    follow_up_date: "Nov 18, 2026",
    status: "Open",
  },
];

const LeadsTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm) ||
      lead.customer.toLowerCase().includes(searchTerm) ||
      lead.follow_up_date?.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || lead.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / 10));
  const paginatedLeads = filteredLeads.slice((page - 1) * 10, page * 10);

  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle>All Leads</CardTitle>
            <CardDescription>View and manage leads records</CardDescription>
          </div>

          <Badge variant="secondary" className="shrink-0">
            {leads.length} {leads.length === 1 ? "customer" : "customers"}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Search leads..."
            className="rounded-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full rounded-full sm:w-auto"
                >
                  <SlidersHorizontalIcon />
                  Filter
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("all");
                  setPage(1);
                }}
              >
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("in progress");
                  setPage(1);
                }}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("open");
                  setPage(1);
                }}
              >
                Open
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("won");
                  setPage(1);
                }}
              >
                Won
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("lost");
                  setPage(1);
                }}
              >
                Lost
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="block">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-5">Lead</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Follow-up Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer">
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.customer}</TableCell>
                  <TableCell>{lead.follow_up_date || "—"}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              Page {page} of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default LeadsTable;
