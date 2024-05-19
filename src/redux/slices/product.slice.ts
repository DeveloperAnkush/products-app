import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../utils/types";

interface ProductState {
  productData: Products[];
}

const initialState: ProductState = {
  productData: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<Products>) => {
      state.productData = [...state.productData, action.payload];
    },
    updateProductData: (state, action: PayloadAction<Products>) => {
      const updatedEmployee = action.payload;
      const index = state.productData.findIndex(
        (product) => product.id === updatedEmployee.id
      );

      if (index !== -1) {
        state.productData[index] = updatedEmployee;
      }
    },
    deleteProductData: (state, action: PayloadAction<string | string[]>) => {
      const payload = action.payload;
      if (typeof payload === "string") {
        state.productData = state.productData.filter(
          (product) => product.id !== payload
        );
      } else if (Array.isArray(payload)) {
        state.productData = state.productData.filter(
          (product) => !payload.includes(product.id!)
        );
      }
    },
  },
});

export const { setProductData, updateProductData, deleteProductData } =
  productSlice.actions;
export default productSlice.reducer;
