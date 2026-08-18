import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { SignInFormValues } from "../types/auth.types";
import { signInSchema } from "../validation/auth.schema";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormValues) => {
    // Mock API call
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/auth/verify-email");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[14px] font-medium text-[#334155]"
        >
          Work email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@rapid.co.nz"
            className="pl-10 h-12 rounded-full border-gray-200 bg-white text-gray-900 text-[14px] shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-[14px] font-medium text-[#334155]"
          >
            Password
          </label>
          <a
            href="#"
            className="text-[14px] font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10 h-12 rounded-full border-gray-200 bg-white text-gray-900 text-[14px] shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-3 pt-1">
        <input
          id="keepSignedIn"
          type="checkbox"
          className="h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white checked:bg-primary checked:border-primary checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%208.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1"
          {...register("keepSignedIn")}
        />
        <label
          htmlFor="keepSignedIn"
          className="text-[14px] font-medium text-[#64748B]"
        >
          Keep me signed in on this device for 30 days.
        </label>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full text-[15px] font-semibold shadow-sm hover:shadow transition-shadow"
        >
          Sign in
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
