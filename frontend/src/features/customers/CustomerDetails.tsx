import CustomerDetailsHeader from "./CustomerDetailsHeader";
import CustomerDetailsInfo from "./CustomerIDetailsInfo";
import CustomerDetailsTable from "./CustomerDetailsTable";

const CustomerDetails = () => {
  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <CustomerDetailsHeader />
      {/* Info */}
      <CustomerDetailsInfo />
      {/* Lead Table */}
      <CustomerDetailsTable />
    </div>
  );
};

export default CustomerDetails;
