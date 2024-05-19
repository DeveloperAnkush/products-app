import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../redux/slices/snackbar.slice";

const Alert = React.forwardRef(function Alert(
  props: AlertProps,
  ref: React.Ref<HTMLDivElement>
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CommonSnackbar: React.FC = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state.snackbar);

  React.useEffect(() => {
    if (state) {
      setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, dispatch]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={state?.snackbarActive}
        autoHideDuration={3000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={state?.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {state?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CommonSnackbar;
