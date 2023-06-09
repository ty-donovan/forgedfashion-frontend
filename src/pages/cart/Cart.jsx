import React, { useState, useEffect, useContext } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartQuantity from './CartQuantity';
import {
    createTheme, ThemeProvider, Box, CardMedia, IconButton, Button, Typography, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions, Grid, Card,
    CardContent, CardActions
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
    },
});

function Cart() {
    //const cartId = 'xjq4swtq4rPECuJHCrzhXxKGIQM2';
    const cartId = Cookies.get("uid")
    const [cartItems, setCartItems] = useState([]);
    const { setNumberOfItemsInCart } = useContext(CartQuantity);
    const navigate = useNavigate();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const { data } = await axios.get(`https://forgedfashion-backend.onrender.com/cart/${cartId}`);
                setCartItems(data.items);
                let quantity = 0;
                data.items.forEach(item => {
                    quantity += item.quantity;
                });
                setNumberOfItemsInCart(quantity);
            } catch (error) {
                console.error(`Error fetching cart: ${error}`);
            }
        };

        fetchCartItems();
    }, [cartId, setNumberOfItemsInCart]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://forgedfashion-backend.onrender.com/cart/${cartId}/${itemToDelete.id}/${itemToDelete.size}`);
            setCartItems(cartItems.filter(item => !(item.id === itemToDelete.id && item.size === itemToDelete.size)));
            let quantity = 0;
            cartItems.forEach(item => {
                if (!(item.id === itemToDelete.id && item.size === itemToDelete.size)) {
                    quantity += item.quantity;
                }
            });
            setNumberOfItemsInCart(quantity);
            setDeleteConfirm(false);
        } catch (error) {
            console.error(`Error deleting item: ${error}`);
        }
    };


    const openDeleteConfirm = (item) => {
        setItemToDelete(item);
        setDeleteConfirm(true);
    };


    const closeDeleteConfirm = () => {
        setItemToDelete(null);
        setDeleteConfirm(false);
    };

    const updateQuantity = async (itemId, itemSize, newQuantity) => {
        if (newQuantity >= 0) {
            try {
                const { data } = await axios.patch(`https://forgedfashion-backend.onrender.com/cart/${cartId}/${itemId}/${itemSize}`, { quantity: newQuantity });
                const updatedCartItems = cartItems.map(item => (item.id === itemId && item.size === itemSize) ? data : item);
                setCartItems(updatedCartItems);
                let quantity = 0;
                updatedCartItems.forEach(item => {
                    quantity += item.quantity;
                });
                setNumberOfItemsInCart(quantity);
            } catch (error) {
                console.error(`Error updating quantity: ${error}`);
            }
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    }


    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: '#f4a261', padding: '20px 0' }}>
                <Grid container justifyContent="center" spacing={2} style={{ backgroundColor: '#f4a261' }}>
                    {cartItems.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <Card style={{ backgroundColor: '#f4a261' }}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ${item.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Size: {item.size}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        <IconButton className="ignore-global" style={{ color: '#2a9d8f' }} onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Remove /></IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton className="ignore-global" style={{ color: '#2a9d8f' }} onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Add /></IconButton>
                                            <IconButton className="ignore-global" style={{ color: '#2a9d8f' }} onClick={() => openDeleteConfirm(item)}><Delete /></IconButton>
                                        </CardActions>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ width: 1, height: 150, overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                image={item.url}
                                                alt={item.name}
                                                sx={{
                                                    objectFit: 'contain',
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                    <Dialog open={deleteConfirm} onClose={closeDeleteConfirm}>
                        <DialogTitle>{"Delete Item"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this item from your cart?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDeleteConfirm}>Cancel</Button>
                            <Button style={{ backgroundColor: '#2a9d8f', color: 'white' }} onClick={handleDelete} color="primary">Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Grid item xs={12} align="center">
                        <Typography variant="h5">Total Price: ${calculateTotalPrice()}</Typography>
                        <Button className="ignore-global" variant="contained" color="primary" style={{ backgroundColor: '#2a9d8f', color: 'white', marginTop: '20px' }} onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );

}

export default Cart;