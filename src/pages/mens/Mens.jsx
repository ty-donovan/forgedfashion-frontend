import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ClothingCard from "../ClothingCard";
import { Typography } from "@mui/material";

export default function Mens() {
  const [mensShirts, setMensShirts] = useState([]);
  const [mensWatches, setMensWatches] = useState([]);
  const [mensShoes, setMensShoes] = useState([]);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    getMensShirts();
    getMensWatches();
    getMensShoes();
    getUserUID();
    // eslint-disable-next-line
  }, []);

  const getUserUID = () => {
    setUserUID(Cookies.get("uid"));
  };

  const getMensShirts = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/mens/shirts").then((result) => {
      setMensShirts(result.data.products);
    });
  };

  const getMensWatches = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/mens/watches").then((result) => {
      setMensWatches(result.data.products);
    });
  };

  const getMensShoes = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/mens/shoes").then((result) => {
      setMensShoes(result.data.products);
    });
  };

  return (
    <>
      <div style={{ textAlign: "center", backgroundColor: "#f4a261" }}>
        <Typography
          variant="h3"
          fontFamily={"Poppins"}
          padding={"20px"}
          color={"#264653"}
          sx={{ fontWeight: "bold" }}
        >
          Men's Clothing
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {mensShirts &&
            mensShirts.map((obj, key) => (
              <ClothingCard
                id={obj.id}
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
                userUID={userUID}
              />
            ))}
          {mensWatches &&
            mensWatches.map((obj, key) => (
              <ClothingCard
                id={obj.id}
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
                userUID={userUID}
              />
            ))}
          {mensShoes &&
            mensShoes.map((obj, key) => (
              <ClothingCard
                id={obj.id}
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={false}
                userUID={userUID}
              />
            ))}
        </div>
      </div>
    </>
  );
}
