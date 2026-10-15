const HomeExample = () => {
  return (
    <div id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>

        <p className="mt-4 text-muted-foreground">
          Get organized and start managing your business in three simple steps.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="text-center">
          <span className="text-4xl font-bold text-primary">01</span>

          <h3 className="mt-4 text-xl font-semibold">Add Your Customers</h3>

          <p className="mt-3 text-muted-foreground">
            Save customer contact information and keep everything organized in
            one place.
          </p>
        </div>

        <div className="text-center">
          <span className="text-4xl font-bold text-primary">02</span>

          <h3 className="mt-4 text-xl font-semibold">Track Your Leads</h3>

          <p className="mt-3 text-muted-foreground">
            Create opportunities for your customers and track their progress
            from start to finish.
          </p>
        </div>

        <div className="text-center">
          <span className="text-4xl font-bold text-primary">03</span>

          <h3 className="mt-4 text-xl font-semibold">Schedule Follow-Ups</h3>

          <p className="mt-3 text-muted-foreground">
            Set follow-up dates and see what needs your attention so you never
            miss an opportunity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeExample;
