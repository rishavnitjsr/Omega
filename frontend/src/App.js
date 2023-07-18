import { useSelector } from 'react-redux';
import './App.css';
import { useState } from "react"
import axios from "axios"
import Navbar from './component/layout/Header/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { useDispatch } from 'react-redux';
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UsersList from "./component/Admin/UsersList.js"
import UpdateUser from "./component/Admin/UpdateUser.js"
import ProductReviews from "./component/Admin/ProdutReviews.js"
import About from "./component/layout/About/About.js";
import { toast } from 'react-toastify';
import NotFound from "./component/layout/Not Found/NotFound.js";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      toast.error(error);
    }
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());
    getStripeApiKey();

  }, [dispatch]);

  const visit = window.location.pathname;

  const visited = window.location.pathname === "/process/payment" ? null : < NotFound />;

  return (
    <Router>
      <Navbar />

      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<ProtectedRoute element={<Payment />} />} />
          </Routes>
        </Elements>
      )}

      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route path="product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/about" element={<About />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/account" element={<ProtectedRoute element={<Profile />} />} />

        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} />

        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route exact path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />

        <Route exact path="/orders" element={<ProtectedRoute element={<MyOrders />} />} />

        <Route exact path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />

        <Route exact path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />

        <Route exact path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />

        <Route isAdmin={true} exact path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

        <Route isAdmin={true} exact path="/admin/products" element={<ProtectedRoute element={<ProductList />} />} />

        <Route isAdmin={true} exact path="/admin/product" element={<ProtectedRoute element={<NewProduct />} />} />

        <Route isAdmin={true} exact path="/admin/product/:id" element={<ProtectedRoute element={<UpdateProduct />} />} />

        <Route isAdmin={true} exact path="/admin/orders" element={<ProtectedRoute element={<OrderList />} />} />

        <Route isAdmin={true} exact path="/admin/order/:id" element={<ProtectedRoute element={<ProcessOrder />} />} />

        <Route isAdmin={true} exact path="/admin/users" element={<ProtectedRoute element={<UsersList />} />} />

        <Route isAdmin={true} exact path="/admin/user/:id" element={<ProtectedRoute element={<UpdateUser />} />} />

        <Route isAdmin={true} exact path="/admin/reviews" element={<ProtectedRoute element={<ProductReviews />} />} />

        <Route
          path={visit} element={visited}
        />

      </Routes>

      <Footer />

    </Router>
  )
}

export default App;