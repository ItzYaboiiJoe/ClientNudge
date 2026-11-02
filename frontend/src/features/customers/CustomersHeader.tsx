import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AddCustomerModal from "./AddCustomerModal";

const CustomerHeader = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your customers and their information
      </p>
      <AddCustomerModal>
        <Button className="w-full sm:w-auto">
          <PlusIcon />
          Add Customer
        </Button>
      </AddCustomerModal>
    </div>
  );
};

export default CustomerHeader;
