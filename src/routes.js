import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Products from "./containers/Products";
import Categories from "./containers/Categories";
import Favorites from "./containers/Favorites";
import Home from "./containers/Home";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/productos" component={Products} />
    <Route path="/categorias" component={Categories} />
    <Route path="/favoritos" component={Favorites} />
    <Route exact path="/" component={Home} />
  </Hoc>
);

export default BaseRouter;
