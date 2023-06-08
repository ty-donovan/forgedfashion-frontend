import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartQuantity from '../cart/CartQuantity';
import logoImage from './Black_White_Simple_Monochrome_Initial_Name_Logo__2_-removebg-preview.png';

function Navbar() {
    const { numberOfItemsInCart } = useContext(CartQuantity);
  
    return (
        <AppBar position="static" style={{ backgroundColor: '#264653' }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            <img src={logoImage} alt="Logo" style={{ width: '65px' }} />
          </Button>
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Poppins' }}>
            Forged Fashion
        </Typography>
          <Button color="inherit" component={Link} to="/mens" style={{ fontFamily: 'Poppins' }}>Mens</Button>
          <Button color="inherit" component={Link} to="/womens" style={{ fontFamily: 'Poppins' }}>Womens</Button>
          <Button color="inherit" component={Link} to="/cart/:cartId">
            <Badge badgeContent={numberOfItemsInCart} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Button color="inherit" component={Link} to="/signup" style={{ fontFamily: 'Poppins' }}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    );
  }

  export default Navbar;