import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./CookiePopUp.css";

function CookiePopUp() {
  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    if (Cookies.get("cookieConsent")) {
      setShowPopUp(false);
    }
  }, []);

  const handleAllowCookies = () => {
    Cookies.set("cookieConsent", true, { expires: 365 });

    const uid = localStorage.getItem("uid");
    if (uid) {
      Cookies.set("uid", uid, { expires: 365 });
      localStorage.removeItem("uid");
    }

    setShowPopUp(false);
  };

  return (
    showPopUp && (
      <div className="cookie-container">
        <p>
          This website uses cookies to ensure you get the best experience on our
          website.
        </p>
        <button onClick={handleAllowCookies}>Allow Cookies</button>
      </div>
    )
  );
}

export default CookiePopUp;
