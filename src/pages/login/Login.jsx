import React from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import CookiePopUp from "../sign-up/components/CookiePopUp";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();

    const form = document.querySelector("#loginForm");
    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("https://forgedfashion-backend.onrender.com/profile/login", data)
      .then((res) => {
        console.log(res.data);

        if (Cookies.get("cookieConsent")) {
          Cookies.set("uid", res.data, { expires: 365 });
        } else {
          localStorage.setItem("uid", res.data);
        }

        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <form id="loginForm">
          <h1>Login</h1>
          <h5>Email</h5>
          <input type="email" name="email" />
          <h5>Password</h5>
          <input type="password" name="password" />
          <p>
            By signing in, you agree to our Terms of Use and Privacy Policy.
          </p>
          <p>
            New to this site? <Link to="/signup">Sign Up</Link>
          </p>
          <button
            type="submit"
            className="login-signInButton"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
        <img
          src="https://images.unsplash.com/photo-1535530705774-695729778c55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBtb2RlbCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="men standing"
        />
      </div>
      <CookiePopUp />
    </div>
  );
}

export default Login;
