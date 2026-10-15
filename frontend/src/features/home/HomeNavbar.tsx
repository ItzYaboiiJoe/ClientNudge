import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_NAME } from "@/lib/constants";

const HomeNavbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Title */}
        <Link to="/" className="text-xl font-bold">
          {APP_NAME}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">
            <Link to="/login">Sign In</Link>
          </Button>

          <Button>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem render={<a href="#features" />}>
                Features
              </DropdownMenuItem>

              <DropdownMenuItem render={<a href="#how-it-works" />}>
                How It Works
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem render={<Link to="/login">Sign In</Link>} />

              <DropdownMenuItem
                render={<Link to="/register">Get Started</Link>}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
