import CustomerHeader from "./CustomersHeader";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "./backend/getCustomers";
import type { CustomerType } from "./backend/getCustomers";
import { useEffect, useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  // Fetch Customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

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
