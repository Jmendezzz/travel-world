import { createContext, useContext, useState, useEffect } from "react";
import { City } from "../interfaces/City";
type props = {
  children: React.ReactNode;
};
const URL_API = "http://localhost:8000/cities";

const initialValues = {
  cities: [] as City[],
  isLoading: false,
  currentCity: {} as City,
  getCityById: (id: string) => {},
  createCity: (city: City): void => {},
};

const CitiesContext = createContext(initialValues);

function CitiesProvider({ children }: props) {
  const [cities, setCities] = useState([] as City[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState({} as City);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const response = await fetch(URL_API);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCityById(id: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API}/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(city: City) {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      setCities(cities => [...cities, data]);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityById,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCitiesContext must be used within a CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCitiesContext };
