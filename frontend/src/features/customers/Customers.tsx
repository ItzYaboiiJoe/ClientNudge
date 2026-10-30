import CustomerHeader from "./CustomersHeader";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "./backend/getCustomers";
import type { CustomerType } from "./backend/getCustomers";
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
      {/* Table */}
      <CustomersTable customers={customers} />
    </div>
  );
};

export default Customers;
