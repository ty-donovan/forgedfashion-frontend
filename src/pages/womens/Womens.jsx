import { React, useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import ClothingCard from "../ClothingCard";

export default function Mens() {
  const [womensDresses, setWomensDresses] = useState([]);
  const [womensShoes, setWomensShoes] = useState([]);
  const [womensWatches, setWomensWatches] = useState([]);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    getWomensDresses();
    getWomensShoes();
    getWomensWatches();
    getUserUID();
    // eslint-disable-next-line
  }, []);

  const getUserUID = () => {
    setUserUID(Cookies.get("uid"));
  };

  const getWomensDresses = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/womens/dresses").then((result) => {
      setWomensDresses(result.data.products);
    });
  };

  const getWomensShoes = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/womens/shoes").then((result) => {
      setWomensShoes(result.data.products);
    });
  };

  const getWomensWatches = () => {
    axios.get("https://forgedfashion-backend.onrender.com/product/womens/watches").then((result) => {
      setWomensWatches(result.data.products);
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
          Women's Clothing
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
          {womensDresses &&
            womensDresses.map((obj, key) => (
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
          {womensShoes &&
            womensShoes.map((obj, key) => (
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
          {womensWatches &&
            womensWatches.map((obj, key) => (
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
        </div>
      </div>
    </>
  );
}
