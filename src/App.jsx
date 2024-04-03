import { Route, Routes } from "react-router-dom";
import Login from './components/LogIn/Login';
import Signin from './components/SignIn/Signin';

const App = () => {
  return (
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Signin/>}/>
      </Routes>
  );
};

export default App;