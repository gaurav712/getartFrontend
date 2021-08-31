import { Route, Switch } from "react-router-dom";
import AddProduct from "../AddProduct";
import Home from "../Home";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/addproduct" component={AddProduct}></Route>
    </Switch>
  );
}
