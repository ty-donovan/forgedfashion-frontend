import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {TextField, CardContent, Card, Button,ThemeProvider, createTheme, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {styled} from '@mui/system';
import CardInput from './CardInput';
import "./Checkout.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentForm() {
    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
        },
    });
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // State
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const useStyles = styled({
        root: {
          maxWidth: 500,
          margin: '35vh auto',
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
        },
        div: {
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
        },
        button: {
          margin: '2em auto 1em',
        },
      });

      const classes = useStyles();
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card", 
            card: elements.getElement(CardElement)
        })
    if(address==='') {
      toast.error("Please enter a shipping address");

    }
    else{
    if(!error) {
        try {
            const {id} = paymentMethod;
            const response = await axios.post("https://forgedfashion-backend.onrender.com/payment", {
                amount: 1000,
                id
            });

            if(response.data.success) {
                setSuccess(true);
            }
            else {
                toast.error("Payment Failed: Try Another Card");
            }

        } catch (error) {
            console.log("Error", error);

        }
    } else {
        console.log(error.message);
    }
  }
}

    return (
        <ThemeProvider theme={theme}>
        <>
        {!success ?
        <Card className={classes.root}>
        <CardContent style = {{backgroundColor: '#f4a261'}} className={classes.content}>
            <div class="wrapperShop">
            <Typography style = {{marginTop:20}} variant="h5">Pay With Stripe</Typography>
            </div>
          <TextField
            label='Alternate Email (optional)'
            style = {{backgroundColor: '#ffffff'}}
            id='outlined-email-input'
            margin='normal'
            variant='outlined'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label='Shipping Address'
            style = {{backgroundColor: '#ffffff'}}
            id='outlined-address-input'
            margin='normal'
            variant='outlined'
            type='address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          
          <CardInput />
          <div  className={classes.div}>
            <Button variant="contained" style = {{backgroundColor: '#2a9d8f', color: 'white', marginTop:20}} color= "primary" className={classes.button} onClick={handleSubmit}>
              Pay
            </Button>
           </div>
           <ToastContainer /> 
        </CardContent>
        
      </Card>
      
        : 
        <div style = {{backgroundColor: '#f4a261'}} class="wrapperShop">
            <Typography style = {{paddingTop:20}} variant="h5">Your Payment Was Succesful!</Typography>
            <Button style={{ backgroundColor: '#2a9d8f', color: 'white', marginTop:20, marginBottom:20 }} onClick = {() => navigate('/')} color="primary">Continue Shopping</Button>

        </div>
        }
        </>
        </ThemeProvider>
    )
}