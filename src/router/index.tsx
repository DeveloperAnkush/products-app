import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import AllProducts from "../pages/homePage";
import ProductDetail from "../pages/productDetail";
import React from "react";
import CommonSnackbar from "../components/snackbar/snackbar";

const RouterGate = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/products-app" element={<AllProducts />} />
          <Route path="/product-details" element={<ProductDetail />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
      <CommonSnackbar />
    </React.Fragment>
  );
};

export default RouterGate;
