import * as React from "react";
// Dispatch Slices Import
import { useDispatch } from "react-redux";
import { deleteProductData } from "../../redux/slices/product.slice";
// Material UI Components Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { openSnackbar } from "../../redux/slices/snackbar.slice";

const Transition = React.forwardRef<unknown, TransitionProps & SlideProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <Slide direction="left" ref={ref} {...rest}>
        {children}
      </Slide>
    );
  }
);

type Props = {
  open: boolean;
  handleClose: () => void;
  selectedData: string[];
  clickedData: string | null;
};

export default function DeleteProductDialog(props: Props) {
  const dispatch = useDispatch();
  const { open, handleClose, selectedData, clickedData } = props;

  const handleDelete = () => {
    let formData: string | string[];
    if (clickedData) {
      formData = clickedData;
      dispatch(deleteProductData(formData));
    } else if (selectedData.length > 0) {
      formData = selectedData;
      dispatch(deleteProductData(formData));
    }
    dispatch(
      openSnackbar({
        message: `Product deleted successfully.`,
        severity: "success",
      })
    );
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Delete Product</Typography>
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
