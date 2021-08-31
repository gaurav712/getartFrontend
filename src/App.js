import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";

export default function App() {
  return (
    <Router>
      <Switch>
        <Routes component={Routes}></Routes>
      </Switch>
    </Router>
  );
}
