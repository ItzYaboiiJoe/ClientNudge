import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HomeCTA = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Ready to Stay on Top of Your Business?
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Start organizing your customers, tracking leads, and managing follow-ups
        in one simple place. Completely free.
      </p>

      <div className="mt-8">
        <Link to="/register">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeCTA;
