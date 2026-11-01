import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useNavigate } from "react-router";
import { menuItems } from "@/lib/constants";
import { deleteCustomer } from "./backend/deleteCustomer";

// Fake Data
const totalLeads: number = 0;

const DeleteCustomerModal = ({
  children,
  customerId,
  customerName,
}: {
  children: React.ReactElement;
  customerId: number;
  customerName: string;
}) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Delete
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCustomer(customerId);
      toast.add({
        type: "success",
        description: `Customer ${customerName} deleted successfully.`,
        priority: "high",
      });
      navigate(menuItems.find((item) => item.url === "/customers")!.url);
    } catch (error) {
      toast.add({
        type: "error",
        description: `Failed to delete customer ${customerName}. Error: ${error instanceof Error ? error.message : String(error)}`,
        priority: "high",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {totalLeads > 0 ? "Cannot Delete Customer" : "Delete Customer?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {totalLeads > 0
              ? `${customerName} has active leads that must be marked as Won or Lost before this customer can be deleted.`
              : `Are you sure you want to delete ${customerName}? This will permanently delete the customer and all associated leads and follow-ups. This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {totalLeads > 0 ? "Close" : "Cancel"}
          </AlertDialogCancel>
          {totalLeads === 0 && (
            <AlertDialogAction
              disabled={loading}
              onClick={handleDelete}
              variant="destructive"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Customer"
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerModal;
