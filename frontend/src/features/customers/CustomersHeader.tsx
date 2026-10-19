import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AddCustomerModal from "./AddCustomerModal";

const CustomerHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your customers and their information
      </p>
      <AddCustomerModal>
        <Button>
          <PlusIcon />
          Add Customer
        </Button>
      </AddCustomerModal>
    </div>
  );
};

export default CustomerHeader;
