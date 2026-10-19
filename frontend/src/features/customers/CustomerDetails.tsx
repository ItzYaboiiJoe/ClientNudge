import CustomerDetailsHeader from "./CustomerDetailsHeader";
import CustomerDetailsInfo from "./CustomerIDetailsInfo";

const CustomerDetails = () => {
  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <CustomerDetailsHeader />
      {/* Info */}
      <CustomerDetailsInfo />
    </div>
  );
};

export default CustomerDetails;
