import CustomerHeader from "./CustomersHeader";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import CustomersEmptyState from "./CustomersEmptyState";
import { getCustomers } from "./backend/getCustomers";
import type { CustomerType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const Customers = () => {
  const { data: customers = [] } = useQuery<CustomerType[]>({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <CustomerHeader />
      {/* Stats */}
      <CustomersStats customers={customers} />
      {/* Table and Empty state */}
      {customers.length === 0 ? (
        <CustomersEmptyState />
      ) : (
        <CustomersTable customers={customers} />
      )}
    </div>
  );
};

export default Customers;
