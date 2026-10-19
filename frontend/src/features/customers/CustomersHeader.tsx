import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const CustomerHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your customers and their information
      </p>
      <Button>
        <PlusIcon />
        Add Customer
      </Button>
    </div>
  );
};

export default CustomerHeader;
