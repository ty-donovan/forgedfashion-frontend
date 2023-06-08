import { React, useState } from "react";
import { Box, Card, CardContent, Divider, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const ToggleButtonNew = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#264653",
  },
  "&:hover": {
    color: "white",
    backgroundColor: "#2a9d8f",
  },
});

export default function ClothingCard(props) {
  const [size, setSize] = useState(null);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [stateErr, setStateErr] = useState({
    openErr: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const { openErr } = stateErr;

  const handleClick = (newState) => () => {
    if (size != null) {
      setState({ open: true, ...newState });
      addToCart();
      setSize(null);
    } else {
      console.log("size is null");
      setStateErr({ openErr: true, ...newState });
    }
  };

  const addToCart = () => {
    let url = "https://forgedfashion-backend.onrender.com/product/add-to-cart/" + props.userUID;
    axios.put(url, {
      id: props.id.toString(),
      name: props.title,
      price: props.price,
      size: size,
      quantity: 1,
      url: props.thumbnail,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
    setStateErr({ ...stateErr, openErr: false });
  };

  return (
    <>
      <Card
        variant="outlined"
        style={{
          margin: "10px",
          width: "430px",
          height: "650px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontFamily={"Poppins"}
            color={"#264653"}
            sx={{ fontWeight: "bold" }}
          >
            {props.title}
          </Typography>
          <Box marginLeft={"-5%"} marginBottom={"1.2%"} marginTop={"1.2%"}>
            <Divider width={"105%"} />
          </Box>
          <Typography
            variant="h5"
            fontFamily={"Poppins"}
            color={"#264653"}
            sx={{ fontStyle: "italic" }}
          >
            {props.brand}
          </Typography>
          <Typography variant="h5" fontFamily={"Poppins"} color={"#264653"}>
            ${props.price}
          </Typography>
          <Box
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h5" fontFamily={"Poppins"} color={"#264653"}>
              {props.rating}/5
            </Typography>
            <StarOutlineIcon
              style={{ marginTop: "2.5px", marginLeft: "5px" }}
            />
          </Box>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              alt="Product Thumbnail"
              src={props.thumbnail}
              width="300px"
              height="300px"
            />
          </div>
          <Box>
            {props.isClothing ? (
              <ToggleButtonGroup
                value={size}
                color="primary"
                exclusive
                onChange={(event, alignment) => setSize(alignment)}
              >
                <ToggleButtonNew value="S">S</ToggleButtonNew>
                <ToggleButtonNew value="M">M</ToggleButtonNew>
                <ToggleButtonNew value="L">L</ToggleButtonNew>
              </ToggleButtonGroup>
            ) : (
              <ToggleButtonGroup
                value={size}
                color="primary"
                exclusive
                onChange={(event, alignment) => setSize(alignment)}
              >
                <ToggleButtonNew value="6">6</ToggleButtonNew>
                <ToggleButtonNew value="7">7</ToggleButtonNew>
                <ToggleButtonNew value="8">8</ToggleButtonNew>
                <ToggleButtonNew value="9">9</ToggleButtonNew>
                <ToggleButtonNew value="10">10</ToggleButtonNew>
                <ToggleButtonNew value="11">11</ToggleButtonNew>
                <ToggleButtonNew value="12">12</ToggleButtonNew>
              </ToggleButtonGroup>
            )}
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleClick({
                vertical: "top",
                horizontal: "center",
              })}
              style={{ marginTop: "10px", backgroundColor: "#2a9d8f" }}
            >
              Add to cart
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3300}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="success">Added to cart!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openErr}
        autoHideDuration={3300}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">
          Please select a size before adding to cart.
        </Alert>
      </Snackbar>
    </>
  );
}
