import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/LogIn/Login";
import Signin from "./components/Auth/SignIn/Signin";
import Canvas from "./components/Canvas/Canvas";
import Gallery from "./components/Gallery/Gallery";
import { useState } from "react";

const App = () => {
  const [isAuthorizedState, setIsAuthorized] = useState(false);

  const handleAuthorizedUser = (boolean) => {
    setIsAuthorized(boolean);
  }

  return (
    <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Signin onAuthorized={handleAuthorizedUser}/>}/>
        <Route exact path="/gallery" element={<Gallery isAuthorized={isAuthorizedState}/>}/>
        <Route exact path="/canvas" element={<Canvas isAuthorized={isAuthorizedState}/>}/>
      </Routes>
  );
};

export default App;
