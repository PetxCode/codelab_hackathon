import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeScreen } from "./components/Main/HomeScreen";
import { CreateScreen } from "./components/Main/CreateScreen";
import { Register } from "./components/Main/Register";
import ProvateRoute from "./components/Main/ProvateRoute";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <ProvateRoute exact path="/" component={HomeScreen} />
        <ProvateRoute exact path="/create" component={CreateScreen} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
