import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Products } from "../utils/types";
import { addEditProductSchema } from "../utils/validation";
import { RootState } from "../redux/store";
import {
  setProductData,
  updateProductData,
} from "../redux/slices/product.slice";
import { openSnackbar } from "../redux/slices/snackbar.slice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categories = [
  { label: "Electronics", value: "Electronics" },
  { label: "Medicines", value: "Medicines" },
  { label: "Grocery", value: "Grocery" },
];

const ProductDetail = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const { id } = useParams();

  let filterResult = useSelector(
    (state: RootState) => state.product.productData
  )?.find((cv: Products) => cv.id === id);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  } = useForm<Products>({
    resolver: yupResolver(addEditProductSchema),
    mode: "all",
  });

  const handleSellPriceChange = (sellPrice: number) => {
    const discount = watch("discount");
    const discountAmount =
      discount && sellPrice && (sellPrice * discount) / 100;
    const discountSellPrice = discount && sellPrice && discountAmount;
    const finalPrice = discount && sellPrice && sellPrice - discountSellPrice;

    setValue("discountSellPrice", discountSellPrice);
    setValue("finalPrice", finalPrice);
  };

  const handleDiscountChange = (discount: number) => {
    const sellPrice = watch("sellPrice");
    const discountAmount =
      sellPrice && discount && (sellPrice * discount) / 100;
    const discountSellPrice = sellPrice && discount && discountAmount;
    const finalPrice = sellPrice && discount && sellPrice - discountSellPrice;

    setValue("discountSellPrice", discountSellPrice);
    setValue("finalPrice", finalPrice);
  };

  const onSubmit = (data: Products) => {
    if (!id) {
      data.id = uuidv4();
      dispatch(setProductData(data));
    } else {
      dispatch(updateProductData(data));
    }
    dispatch(
      openSnackbar({
        message: `Product ${id ? "updated" : "added"} successfully.`,
        severity: "success",
      })
    );
    navigate(`/products-app`);
  };

  React.useEffect(() => {
    if (id) {
      reset(filterResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <React.Fragment>
      <Box sx={{ marginTop: 10, padding: 5 }}>
        <Paper elevation={5} sx={{ padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Typography variant="h5">{`${id ? 'Edit' : 'Add'} Product Detail`}</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(`/products-app`)}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Name</InputLabel>
                <Controller
                  name="productName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      fullWidth
                      inputProps={{ maxLength: 40 }}
                      {...field}
                      error={Boolean(errors.productName)}
                      helperText={
                        errors?.productName ? errors.productName?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        id="demo-simple-select"
                        {...field}
                        value={field.value || ""}
                        error={Boolean(errors.category)}
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors?.category ? errors.category?.message : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Description</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      multiline
                      maxRows={2}
                      fullWidth
                      inputProps={{ maxLength: 300 }}
                      {...field}
                      error={Boolean(errors.description)}
                      helperText={
                        errors?.description ? errors.description?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Expiry Date</InputLabel>
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="date"
                      fullWidth
                      {...field}
                      error={Boolean(errors.expiryDate)}
                      helperText={
                        errors?.expiryDate ? errors.expiryDate?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Cost Price</InputLabel>
                <Controller
                  name="costPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        let limit = 8;
                        field.onChange(e.target.value.slice(0, limit));
                      }}
                      error={Boolean(errors.costPrice)}
                      helperText={
                        errors?.costPrice ? errors.costPrice?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Sell Price</InputLabel>
                <Controller
                  name="sellPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        let limit = 8;
                        field.onChange(e.target.value.slice(0, limit));
                        handleSellPriceChange(parseFloat(e.target.value));
                      }}
                      error={Boolean(errors.sellPrice)}
                      helperText={
                        errors?.sellPrice ? errors.sellPrice?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Discount</InputLabel>
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        let limit = 3;
                        field.onChange(e.target.value.slice(0, limit));
                        handleDiscountChange(parseFloat(e.target.value));
                      }}
                      error={Boolean(errors.discount)}
                      helperText={
                        errors?.discount ? errors.discount?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Discounted Sell Price</InputLabel>
                <Controller
                  name="discountSellPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      InputProps={{ readOnly: true }}
                      fullWidth
                      {...field}
                      error={Boolean(errors.discountSellPrice)}
                      helperText={
                        errors?.discountSellPrice
                          ? errors.discountSellPrice?.message
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <InputLabel required>Final Price</InputLabel>
                <Controller
                  name="finalPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-controlled"
                      variant="outlined"
                      type="text"
                      InputProps={{ readOnly: true }}
                      fullWidth
                      {...field}
                      error={Boolean(errors.finalPrice)}
                      helperText={
                        errors?.finalPrice ? errors.finalPrice?.message : null
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 3,
            }}
          >
            <Button variant="outlined" onClick={() => handleSubmit(onSubmit)()}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default ProductDetail;
