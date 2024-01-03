import { createContext, useContext, useReducer } from "react";


const FAKE_USER ={
    name :"Jhon Merchan",
    email: "jhon@gmail.com",
    password: "qwerty",
    avatar:"https://i.pravatar.cc/100?u=zz"
}
const initialState = {
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {},
  logout: () => {},
  error: "",
  isLoading: false,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const AuthContext = createContext(initialState);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated}, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if(email === FAKE_USER.email && password === FAKE_USER.password){
      dispatch({type: "login", payload: FAKE_USER})

  }
}
  function logout (){
    dispatch({type: "logout"})
  }
  return <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthContext };
