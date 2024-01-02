import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { City } from "../interfaces/City";
type props = {
  children: React.ReactNode;
};
const URL_API = "http://localhost:8000/cities";

const initialValues = {
  cities: [] as City[],
  isLoading: false,
  currentCity: {} as City,
  error: "",
  getCityById: (id: string) => {},
  createCity: (city: City): void => {},
  deleteCity: (id: string | number): void => {},
};

const CitiesContext = createContext(initialValues);

function reducer(state: any, action: any) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "cities/selected":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city: City) => city.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }: props) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialValues
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(URL_API);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error: Error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  async function getCityById(id: string) {
    if(currentCity.id === id) return;
    
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${URL_API}/${id}`);
      const data = await response.json();
      dispatch({ type: "cities/selected", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function createCity(city: City) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${URL_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (error: Error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function deleteCity(id: string | number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (error: Error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCityById,
        createCity,
        deleteCity,
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
