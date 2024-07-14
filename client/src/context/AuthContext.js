import React, {createContext,useEffect,useState} from "react";
import axios from "axios";


const AuthContext = createContext();
//to return this context to routers and other areas..we need context providers 
// so we create AuthContext obj accrdnly we send providers!
function AuthContextProvider(props) {
  const [loggedIn,setloggedIn] = useState(undefined);
  
  //this is function need to run when the components loads for the first time..
  //that we are checking whether user is logged in already or not..
  //this is called context..we pass this info to Routers ancled display the functions in the frontend accordingly!

  async function getloggedIn()
  {
    const loggedInRes = await axios.get("http://localhost:5001/auth/loggedIn");
    setloggedIn(loggedInRes.data);
  } 

  useEffect(() => {
    getloggedIn();
  },[]);

  //we use contexts to order the components in react...so we return Authcontext object along with value of loggedIn..value
  //in this case, we are returning in the form of object along with getlogged func because we can check anytime whether user is 
  //loggedIn or not with this func!
  return <AuthContext.Provider value={{loggedIn,getloggedIn}}>
    {/* this children will be the componets of routers */}
    {props.children}
    </AuthContext.Provider>

};

export default AuthContext;
export {AuthContextProvider};