import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import RequestList from "./pages/requestList/RequestList";
import User from "./pages/user/User";
import RequestDetail from "./pages/requestDetail/RequestDetail";
import NewRequest from "./pages/newRequest/NewRequest";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import RegisterForm from "./pages/auth/Register";
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Authenticate from "./pages/auth/Authenticate";
import { HomeTwoTone } from "@material-ui/icons";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Authenticate />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <ProtectedRoute exact path="/" component={User} />
                <ProtectedRoute path="/requests" component={RequestList} />
                {/* <ProtectedRoute path="/user" component={User} /> */}
                <ProtectedRoute path="/new-request" component={NewRequest} />
                <ProtectedRoute
                  path="/request-detail"
                  component={RequestDetail}
                />
                <ProtectedRoute path="/devices/:deviceId" component={Product} />
                <ProtectedRoute exact path="/devices" component={ProductList} />
                <ProtectedRoute path="/new-product" component={NewProduct} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
