import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Checkout.css";

// const appearance = {
//     theme: 'stripe'
//   };
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card", 
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try {
            const {id} = paymentMethod;
            const response = await axios.post("https://forgedfashion-backend.onrender.com/payment", {
                amount: 1000,
                id
            });

            console.log(response);
            setSuccess(true);

            if(response.data.success) {
                console.log("succesful payment");
                setSuccess(true);
            }

        } catch (error) {
            console.log("Error", error);

        }
    } else {
        console.log(error.message);
    }
}

    return (
        <>
        {!success ?
        <form onSubmit = {handleSubmit}>
            <fieldset className = "FormGroup">
                <div className = "FormRow">
                    <CardElement options = {CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="paymentButton">Pay</button>
        </form>
        : 
        <div className="succesful-checkout">
            <h2>Your Payment was Succesful!</h2>
        </div>
        }
        </>
    )
}