import LeadsHeader from "./LeadsHeader";
import LeadsStats from "./LeadsStats";
import LeadsTable from "./LeadsTable";

const Leads = () => {
  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <LeadsHeader />
      {/* Stats */}
      <LeadsStats />
      {/* Table */}
      <LeadsTable />
    </div>
  );
};

export default Leads;
