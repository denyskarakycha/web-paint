import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/LogIn/Login';
import Signin from './components/SignIn/Signin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Signin} />
      </Switch>
    </Router>
  );
};

export default App;