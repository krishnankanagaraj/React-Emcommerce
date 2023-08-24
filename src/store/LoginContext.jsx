import React from "react";
const LoginContext=React.createContext({
    isLoggedIn:false,
    setIsLoggedIn:()=>{},
    user:null
})
export default LoginContext;