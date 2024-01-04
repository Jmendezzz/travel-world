import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Home from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Home = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route element={<ProtectectedRoute />}>
                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to={"cities"} />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                  <Route path="cities/:id" element={<City />} />
                </Route>
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>{" "}
    </AuthProvider>
  );
}

export default App;
