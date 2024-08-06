import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RequestList from "./pages/requestList/RequestList";
import User from "./pages/user/User";
import RequestDetail from "./pages/requestDetail/RequestDetail";
import NewRequest from "./pages/newRequest/NewRequest";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Authenticate from "./pages/auth/Authenticate";
import RegisterForm from "./pages/auth/Register";

function App() {
  return (
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
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/requests">
                <RequestList />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/newRequest">
                <NewRequest />
              </Route>
              <Route path="/requestDetail">
                <RequestDetail />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </Switch>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
