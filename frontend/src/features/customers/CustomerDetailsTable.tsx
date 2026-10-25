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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import AddLeadModal from "./AddLeadModal";

// Fake Data
const leads = [
  {
    id: 1,
    name: "Lawn Maintenance",
    value: "75.00",
    status: "Open",
    created: "Oct 10, 2025",
  },
  {
    id: 2,
    name: "Tree Trimming",
    value: "250.00",
    status: "In Progress",
    created: "Oct 5, 2025",
  },
  {
    id: 3,
    name: "Fall Cleanup",
    value: "150.00",
    status: "Won",
    created: "Sep 28, 2025",
  },
  {
    id: 4,
    name: "Landscape Design",
    value: "500.00",
    status: "Lost",
    created: "Sep 15, 2025",
  },
];

const CustomerDetailsTable = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(leads.length / 10);
  const paginatedLeads = leads.slice((page - 1) * 10, page * 10);

  const navigate = useNavigate();

  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>Customer Leads</CardTitle>
            <CardDescription>
              All leads associated with this customer.
            </CardDescription>
          </div>
          <AddLeadModal>
            <Button>
              <PlusIcon />
              Add Lead
            </Button>
          </AddLeadModal>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="px-5">Lead</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => navigate(`#`)}
              >
                <TableCell className="">{lead.name}</TableCell>
                <TableCell className="p-0">{lead.value}</TableCell>
                <TableCell className="p-0">
                  <Badge
                    variant={lead.status === "Open" ? "default" : "secondary"}
                    className={
                      lead.status === "Lost"
                        ? "bg-red-100 text-red-700"
                        : lead.status === "Won"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                    }
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="p-0">{lead.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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

export default CustomerDetailsTable;
