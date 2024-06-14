import React, {useContext, useState} from 'react';
import Button from "./UI/Button.jsx";
import Cart from "./Cart.jsx";
import logoImg from '../assets/logo.jpg';

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

function Header() {

    const cartCtx = useContext(CartContext);

    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((acc,cur) => {
        return acc + cur.quantity;
    },0)

    const handleShowCart = () => {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant"/>
                <h1>Best Sellers</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    장바구니 ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}

export default Header;