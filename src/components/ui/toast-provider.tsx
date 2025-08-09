import { Toaster } from "@/components/ui/sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={4000}
      expand={true}
      className="font-['Cairo',sans-serif]"
    />
  );
} 