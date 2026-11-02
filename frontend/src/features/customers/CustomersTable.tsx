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
import { Link, useNavigate } from "react-router";
import { menuItems } from "@/lib/constants";
import type { CustomerType } from "@/lib/types";

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
  const customersUrl = menuItems.find(
    (item) => item.title === "Customers",
  )!.url;

  // Format phone number
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
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle>All Customers</CardTitle>
            <CardDescription>View and manage customer records</CardDescription>
          </div>

          <Badge variant="secondary" className="shrink-0">
            {customers.length}{" "}
            {customers.length === 1 ? "customer" : "customers"}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
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
        {filteredCustomers.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No customers found.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
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
                      onClick={() => navigate(`${customersUrl}/${customer.id}`)}
                    >
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{formatPhoneNumber(customer.phone)}</TableCell>
                      <TableCell>{customer.email || "—"}</TableCell>
                      <TableCell>{customer.address || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={customer.status ? "default" : "destructive"}
                        >
                          {customer.status ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile customer cards */}
            <div className="space-y-3 md:hidden">
              {paginatedCustomers.map((customer) => (
                <Link
                  key={customer.id}
                  to={`${customersUrl}/${customer.id}`}
                  className="block rounded-xl border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{customer.name}</p>

                    <Badge
                      variant={customer.status ? "default" : "destructive"}
                    >
                      {customer.status ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p>{formatPhoneNumber(customer.phone)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="break-all">{customer.email || "—"}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p>{customer.address || "—"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(Math.max(1, page - 1))}
                    aria-disabled={page === 1}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomersTable;
