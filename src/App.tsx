import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Home from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const URL_API = "http://localhost:8000/cities";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try{
        const response = await fetch(URL_API);
        const data = await response.json();
        setCities(data);
      }catch(error){
        alert(error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  useEffect
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<CountryList  cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<div>Form</div>} />
        </Route>
        <Route path="login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
