import CustomerDetailsHeader from "./CustomerDetailsHeader";
import CustomerDetailsInfo from "./CustomerIDetailsInfo";
import CustomerDetailsTable from "./CustomerDetailsTable";
import { Skeleton } from "@/components/ui/skeleton";
import type { CustomerType } from "@/lib/types";
import { getCustomerInfo } from "./backend/getCustomerInfo";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const CustomerDetails = () => {
  const { customerId } = useParams();

  const { data: customerInfo } = useQuery<CustomerType>({
    queryKey: ["customerInfo", customerId],
    queryFn: () => getCustomerInfo(Number(customerId)),
  });

  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      {customerInfo ? (
        <CustomerDetailsHeader customerInfo={customerInfo} />
      ) : (
        <Skeleton className="h-24 w-full rounded-xl" />
      )}
      {/* Info */}
      {customerInfo ? (
        <CustomerDetailsInfo customerInfo={customerInfo} />
      ) : (
        <Skeleton className="h-64 w-full rounded-xl" />
      )}
      {/* Lead Table */}
      <CustomerDetailsTable />
    </div>
  );
};

export default CustomerDetails;
