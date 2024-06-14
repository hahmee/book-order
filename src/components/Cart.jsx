import React, {useContext, useEffect, useState} from 'react';
import cartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

const Cart = ()  => {
    const {items, addItem, removeItem} = useContext(cartContext);
    const {progress, hideCart, showCheckout} = useContext(UserProgressContext);

    const cartTotal = items.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
    }, 0);

    return (
        <Modal
            className="cart"
            onClose={progress ==='cart' ? hideCart: null}
            open={progress === 'cart'}>
            <h2>장바구니</h2>
            <ul>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => addItem(item)}
                        onDecrease={() => removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={hideCart}>
                    닫기
                </Button>
                {items.length > 0 && (
                    <Button onClick={showCheckout}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    );
}

export default Cart;