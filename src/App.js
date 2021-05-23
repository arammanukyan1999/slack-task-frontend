import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isAuthentificated = !!localStorage.getItem('token')
  return (
    <Router>
      <Switch>
        {isAuthentificated && <Route exact path="/">
          <Dashboard />
        </Route>
        }
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
