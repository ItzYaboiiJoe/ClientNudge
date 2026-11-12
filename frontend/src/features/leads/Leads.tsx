import LeadsHeader from "./LeadsHeader";
import LeadsStats from "./LeadsStats";

const Leads = () => {
  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <LeadsHeader />
      {/* Stats */}
      <LeadsStats />
    </div>
  );
};

export default Leads;
