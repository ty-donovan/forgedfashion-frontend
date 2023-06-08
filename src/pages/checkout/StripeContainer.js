import React from 'react';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import "./Checkout.css";

const PUBLIC_KEY = "pk_test_51NG5A8DKLQI0c41jzZyamcjZvBLYJr5jpcADHXwvSHgBEM3MDqkDCOEHcoMWlnggIB0wiCotP9PomEqcenuG3Iu400crIxWnGb";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function stripeContainer() {
    return (
        <Elements stripe ={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}