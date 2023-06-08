import React from "react";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CookiePopUp from "./components/CookiePopUp";
import Cookies from "js-cookie";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = document.querySelector("#signUpForm");
    const formData = new FormData(form);
    const password = formData.get("password");
    const email = formData.get("email");

    if (invalidInputs(email, password)) {
      return;
    }

    if (password !== formData.get("confirmPassword")) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://forgedfashion-backend.onrender.com/profile/sign-up", data)
      .then((res) => {

        if (Cookies.get("cookieConsent")) {
          Cookies.set("uid", res.data, { expires: 365 });
        } else {
          localStorage.setItem("uid", res.data);
        }

        form.reset();

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const invalidInputs = (email, password) => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return true;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return true;
    }

    return false;
  };

  return (
    <div className="signUp">
      <div className="signUp-container">
        <form id="signUpForm">
          <h1>Sign Up</h1>
          <h5>Email</h5>
          <input type="email" name="email" />
          <h5>Password</h5>
          <input type="password" name="password" />
          <h5>Confirm Password</h5>
          <input type="password" name="confirmPassword" />
          <p>
            By signing up, you agree to our Terms of Use and Privacy Policy.
          </p>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <button
            type="submit"
            className="signUp-signInButton"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
        <img
          src="https://media.istockphoto.com/id/1399426267/photo/serious-young-mixed-race-female-posing-in-trendy-fashionable-clothing-while-sitting-on-a.webp?b=1&s=170667a&w=0&k=20&c=pSYFj8lk1CtfDSYhf5kZOQFM3S6p023xmTVPpjCWuQQ="
          alt="happy person"
        />
      </div>
      <CookiePopUp />
    </div>
  );
}

export default SignUp;
