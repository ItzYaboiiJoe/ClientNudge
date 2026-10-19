import CustomerHeader from "./CustomersHeader";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";

const Customers = () => {
  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <CustomerHeader />
      {/* Stats */}
      <CustomersStats />
      {/* Table */}
      <CustomersTable />
    </div>
  );
};

export default Customers;
