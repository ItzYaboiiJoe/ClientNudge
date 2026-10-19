import CustomerDetails from "@/features/customers/CustomerDetails";
import { useParams } from "react-router";

const CustomerDetailsPage = () => {
  const { customerId } = useParams();

  return <CustomerDetails customerId={Number(customerId)} />;
};

export default CustomerDetailsPage;
