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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Fake Users (Placeholder)
const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah@example.com",
    address: "123 Oak Street",
    status: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "(555) 234-5678",
    email: "",
    address: "456 Pine Avenue",
    status: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    phone: "(555) 345-6789",
    email: "emily@example.com",
    address: "789 Maple Drive",
    status: false,
  },
  {
    id: 4,
    name: "David Wilson",
    phone: "(555) 456-7890",
    email: "david@example.com",
    address: "",
    status: true,
  },
];

const CustomersTable = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(customers.length / 10);
  const paginatedCustomers = customers.slice((page - 1) * 10, page * 10);

  const navigate = useNavigate();

  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>All Customers</CardTitle>
            <CardDescription>View and manage customer records</CardDescription>
          </div>
          <Badge variant="secondary">24 customers</Badge>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search customers..." className="rounded-full" />
          <Button variant="outline" className="rounded-full">
            <SlidersHorizontalIcon />
            Filter
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="px-5">Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <TableCell className="">{customer.name}</TableCell>
                <TableCell className="p-0">{customer.phone}</TableCell>
                <TableCell className="p-0">{customer.email || "—"}</TableCell>
                <TableCell className="p-0">{customer.address || "—"}</TableCell>
                <TableCell className="p-0">
                  <Badge
                    variant={
                      customer.status === true ? "default" : "destructive"
                    }
                  >
                    {customer.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
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

export default CustomersTable;
