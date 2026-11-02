import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Edit } from "lucide-react";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";
import type { CustomerType } from "@/lib/types";

const CustomerDetailsHeader = ({
  customerInfo,
}: {
  customerInfo: CustomerType;
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h1 className="text-xl font-semibold sm:text-2xl">
            {customerInfo.name}
          </h1>
          <Badge variant={customerInfo.status ? "default" : "destructive"}>
            {customerInfo.status ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Customer since{" "}
          {new Date(customerInfo.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>

      <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
        <EditCustomerModal customer={customerInfo}>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Edit /> Edit Customer
          </Button>
        </EditCustomerModal>

        <DeleteCustomerModal
          customerId={customerInfo.id}
          customerName={customerInfo.name}
        >
          <Button variant="destructive" className="flex-1 sm:flex-none">
            <Trash /> Delete Customer
          </Button>
        </DeleteCustomerModal>
      </div>
    </div>
  );
};

export default CustomerDetailsHeader;
