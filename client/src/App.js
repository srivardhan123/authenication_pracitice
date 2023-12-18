import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

//in the context compoents, the components of router will pass as childs to AuthContextProvider component itself..
//so using props we order the components in the Router based on the output value of AuthContextProvider..
function App() {
  return (<AuthContextProvider>
    <Router />
  </AuthContextProvider>
  );
}

export default App;
