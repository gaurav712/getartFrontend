import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import AddProduct from "../AddProduct";
import Login from "../Login";
import SignUp from "../SignUp";
import ProductDetails from "../ProductDetails";
import Authenticated from "../Authenticated";
import Logout from "../Logout";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/addproduct" component={AddProduct}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route
        exact
        path="/product/:productId"
        component={ProductDetails}
      ></Route>
      <Route exact path="/authenticated" component={Authenticated}></Route>
      <Route exact path="/logout" component={Logout}></Route>
    </Switch>
  );
}
