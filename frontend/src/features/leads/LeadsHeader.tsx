import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const LeadsHeader = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Manage and track your sales opportunities.
      </p>
      <Button className="w-full sm:w-auto">
        <PlusIcon />
        Add Lead
      </Button>
    </div>
  );
};

export default LeadsHeader;
