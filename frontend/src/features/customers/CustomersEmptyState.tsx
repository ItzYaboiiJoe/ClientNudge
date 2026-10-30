import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AddCustomerModal from "./AddCustomerModal";

const CustomersEmptyState = () => {
  return (
    <div className="mt-10 flex min-h-72 items-center justify-center rounded-lg border border-dashed">
      <div className="text-center">
        <p className="font-medium">No customers yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Add your first customer to start managing your contacts.
        </p>
        <AddCustomerModal>
          <Button className="mt-4">
            <PlusIcon />
            Add Customer
          </Button>
        </AddCustomerModal>
      </div>
    </div>
  );
};

export default CustomersEmptyState;
