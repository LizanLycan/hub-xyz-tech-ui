import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CLOSE_TIMEOUT, useAlerts } from "../../stores/useAlerts";

export default function Alerts() {
  const state = useAlerts((state) => state);

  return (
    <>
      <Snackbar
        open={state.openSuccess}
        autoHideDuration={CLOSE_TIMEOUT}
        onClose={state.closeSuccess}
      >
        <Alert
          onClose={state.closeSuccess}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.openError}
        autoHideDuration={CLOSE_TIMEOUT}
        onClose={state.closeError}
      >
        <Alert
          onClose={state.closeError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
