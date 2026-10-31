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
import { useNavigate } from "react-router";
import { menuItems } from "@/lib/constants";
import type { CustomerType } from "./backend/getCustomers";

const CustomersTable = ({ customers }: { customers: CustomerType[] }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status) ||
      (statusFilter === "inactive" && !customer.status);

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / 10));
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * 10,
    page * 10,
  );

  const navigate = useNavigate();

  // To Formate the phone to look nicer
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length !== 10) {
      return phone;
    }

    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>All Customers</CardTitle>
            <CardDescription>View and manage customer records</CardDescription>
          </div>
          <Badge variant="secondary">{customers.length} customers</Badge>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search customers..."
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
                <Button variant="outline" className="rounded-full">
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
                All Customers
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("active");
                  setPage(1);
                }}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("inactive");
                  setPage(1);
                }}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                onClick={() =>
                  navigate(
                    `${menuItems.find((item) => item.title === "Customers")!.url}/${customer.id}`,
                  )
                }
              >
                <TableCell className="">{customer.name}</TableCell>
                <TableCell>{formatPhoneNumber(customer.phone)}</TableCell>
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
