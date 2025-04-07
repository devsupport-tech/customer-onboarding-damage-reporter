
import { toast } from "sonner";

export const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validateEmailForReport = (email: string): boolean => {
  if (!email) {
    toast.error("Please enter an email address");
    return false;
  }
  
  if (!isValidEmail(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }
  
  return true;
};
