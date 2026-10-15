import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { APP_NAME } from "@/lib/constants";

// Form Schema
const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  // State to handle login errors
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    // Clear Error
    setErrorLogin(null);
    // Activate loading spinner
    setLoading(true);
    console.log(data);
    navigate("/");
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your {APP_NAME} account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={loginForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Password */}
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="login-form-password">
                      Password
                    </FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="login-form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button type="submit" form="login-form" className="w-full">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Display Error Message */}
        {errorLogin && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorLogin}
          </p>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
