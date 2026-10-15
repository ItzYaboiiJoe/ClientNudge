import { Link } from "react-router";
import { MoveLeft } from "lucide-react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <MoveLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
