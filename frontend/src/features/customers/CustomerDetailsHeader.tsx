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
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{customerInfo.name}</h1>
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
      <div className="space-x-3">
        <EditCustomerModal>
          <Button variant={"outline"}>
            <Edit /> Edit Customer
          </Button>
        </EditCustomerModal>
        <DeleteCustomerModal>
          <Button variant={"destructive"}>
            <Trash /> Delete Customer
          </Button>
        </DeleteCustomerModal>
      </div>
    </div>
  );
};

export default CustomerDetailsHeader;
