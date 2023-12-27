import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Home from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<div>LIST</div>} />
          <Route path="cities" element={<div>Cities</div>} />
          <Route path="countries" element={<div>Countries</div>} />
          <Route path="form" element={<div>Form</div>} />
        </Route>
        <Route path="login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
