import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Success = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert
    elevation={6}
    ref={ref}
    variant="filled"
    severity="success"
    {...props}
  />
));

interface SnackbarProps {
  open: boolean;
  message: string;
  handleClose: () => void;
  type: "error" | "success";
}

const SnackBar: React.FC<SnackbarProps> = ({
  open,
  message,
  handleClose,
  type,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {type === "success" ? (
        <Success onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Success>
      ) : (
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default SnackBar;
