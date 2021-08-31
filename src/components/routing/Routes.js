import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import AddProduct from "../AddProduct";
import Login from "../Login";
import SignUp from "../SignUp";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/addproduct" component={AddProduct}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
    </Switch>
  );
}