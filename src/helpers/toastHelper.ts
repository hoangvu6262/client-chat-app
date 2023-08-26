import { toast } from "react-toastify";

const DEFAULT_CONFIG = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  hideProgressBar: true,
  pauseOnHover: true,
  closeOnClick: true,
};

const success = (message: string, config = DEFAULT_CONFIG) => {
  toast.success(message, config);
};

const error = (message: string, config = DEFAULT_CONFIG) => {
  toast.error(message, config);
};

const warning = (message: string, config = DEFAULT_CONFIG) => {
  toast.warning(message, config);
};

const dismiss = () => {
  toast.dismiss();
};

export const toastHelper = {
  success,
  error,
  warning,
  dismiss,
};
