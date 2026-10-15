import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HomeHero = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        Never Miss a Follow-Up Again.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Keep track of customers, manage leads, and stay on top of follow-ups.
        Everything you need to grow your business, all in one place.
      </p>

      <div className="mt-8">
        <Link to="/register">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
