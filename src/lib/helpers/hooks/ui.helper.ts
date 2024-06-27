import { toast, ToastPosition, TypeOptions } from "react-toastify";
import { TOAST } from "../../../constants/ui.constant.ts";

interface ToastProps {
  message?: string;
  position?: ToastPosition;
  autoClose?: number;
  type?: TypeOptions;
  theme?: "colored" | "light" | "dark";
}

export const showToast = ({
  message,
  position = "bottom-right",
  autoClose = TOAST.AUTO_CLOSE,
  type = "success",
  theme = "colored",
}: ToastProps) => {
  toast(message ? message : "Something went wrong! please try again later", {
    type: message ? type : "warning",
    theme: theme,
    autoClose: autoClose,
    position: position,
  });
};
