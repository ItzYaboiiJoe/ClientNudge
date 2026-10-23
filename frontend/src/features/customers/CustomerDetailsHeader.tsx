import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Edit } from "lucide-react";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

const CustomerDetailsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">John Smith</h1>
          <Badge variant="default">Active</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Customer since Jan 15, 2026
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
