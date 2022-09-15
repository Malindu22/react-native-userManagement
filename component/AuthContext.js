import React from "react";

// set the defaults
const AuthContext = React.createContext({
    isAuth: false,
    setAuth: () => { }
});

export default AuthContext;