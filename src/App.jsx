import { Route, Routes } from "react-router-dom";
import Login from './components/Auth/LogIn/Login';
import Signin from './components/Auth/SignIn/Signin';
import Canvas from "./components/Canvas/Canvas";
import Gallery from "./components/Gallery/Gallery";

const App = () => {
  return (
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Signin/>}/>
        <Route exact path="/gallery" element={<Gallery/>}/>
        <Route exact path="/canvas" element={<Canvas/>}/>
      </Routes>
  );
};

export default App;