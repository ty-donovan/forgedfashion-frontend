import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Cart from "./cart/Cart";
import axios from "axios";
import CartQuantity from "./cart/CartQuantity";
import Login from "./login/Login.jsx";
import SignUp from "./sign-up/SignUp.jsx";
import "./App.css";
import Mens from "./mens/Mens";
import Womens from "./womens/Womens";
import Cookies from "js-cookie";
import StripeContainer from "./checkout/StripeContainer";
import Home from "./home/Home.jsx";

function App() {
  //const cartId = "xjq4swtq4rPECuJHCrzhXxKGIQM2";
  const cartId = Cookies.get("uid");

  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(
          `https://forgedfashion-backend.onrender.com/cart/${cartId}`
        );
        let quantity = 0;
        data.items.forEach((item) => {
          quantity += item.quantity;
        });
        setNumberOfItemsInCart(quantity);
      } catch (error) {
        console.error(`Error fetching cart: ${error}`);
      }
    };

    fetchCartItems();
  }, [cartId]);

  return (
    <Router>
      <CartQuantity.Provider
        value={{ numberOfItemsInCart, setNumberOfItemsInCart }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/products" element={<Products />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */
          <Route path="/womens" element={<Womens />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/cart/:cartId" element={<Cart />} />
          <Route path="/checkout" element={<StripeContainer />} />
        </Routes>
      </CartQuantity.Provider>
    </Router>
  );
}

export default App;
