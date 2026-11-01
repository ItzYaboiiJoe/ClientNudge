import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCustomerForm from "./EditCustomerForm";
import type { CustomerType } from "@/lib/types";

const EditCustomerModal = ({
  children,
  customer,
}: {
  children: React.ReactElement;
  customer: CustomerType;
}) => {
  // Control modal open and close
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Update the customer's information and status.
          </DialogDescription>
        </DialogHeader>
        <EditCustomerForm
          onSuccess={() => setOpen(false)}
          customer={customer}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerModal;
