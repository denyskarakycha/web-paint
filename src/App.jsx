import { Route, Routes } from "react-router-dom";
import Login from './components/LogIn/Login';
import Signin from './components/SignIn/Signin';
import Canvas from "./components/Canvas/Canvas";
import Picture from "./components/Picture/Picture";
import Gallery from "./components/Gallery/Gallery";

const App = () => {
  return (
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Signin/>}/>
        <Route exact path="/gallery" element={<Gallery/>}/>
        <Route exact path="/canvas" element={<Canvas/>}/>
        <Route exact path="/picture" element={<Picture/>}/>
      </Routes>
  );
};

export default App;