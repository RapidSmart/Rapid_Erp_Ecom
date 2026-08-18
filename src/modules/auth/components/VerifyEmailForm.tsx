import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useState } from "react";

export function VerifyEmailForm() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", value);
    // Handle OTP verification here
  };

  const slotClassName =
    "w-10 h-12 sm:w-14 sm:h-16 text-xl sm:text-2xl font-bold bg-[#F8FAFC] !border !border-gray-200 !rounded-xl";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center space-y-5"
    >
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(val) => setValue(val)}
        autoFocus
      >
        <InputOTPGroup className="gap-2 sm:gap-3">
          <InputOTPSlot index={0} className={slotClassName} />
          <InputOTPSlot index={1} className={slotClassName} />
          <InputOTPSlot index={2} className={slotClassName} />
        </InputOTPGroup>

        <InputOTPSeparator className="text-gray-400 px-2 sm:px-4" />

        <InputOTPGroup className="gap-2 sm:gap-3">
          <InputOTPSlot index={3} className={slotClassName} />
          <InputOTPSlot index={4} className={slotClassName} />
          <InputOTPSlot index={5} className={slotClassName} />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-[14px] text-gray-500 font-medium">
        Didn't receive it?{' '}
        <span className="text-primary font-semibold cursor-pointer hover:underline underline-offset-4 transition-all">
          Resend code
        </span>
      </p>

      <div className="w-full space-y-3 pt-1">
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg text-[15px] font-semibold transition-colors cursor-pointer"
          disabled={value.length < 6}
        >
          Verify email
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Button>
      </div>
    </form>
  );
}
