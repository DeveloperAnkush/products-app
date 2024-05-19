import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CommonTable from "../components/table/table";
import { RootState } from "../redux/store";
import { Products } from "../utils/types";

const AllProducts = () => {
  const product_list: Products[] = useSelector(
    (state: RootState) => state.product.productData
  );
  return (
    <Box
      sx={{
        marginTop: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <CommonTable productData={product_list} />
    </Box>
  );
};

export default AllProducts;
