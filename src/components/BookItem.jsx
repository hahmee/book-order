import React, {useContext} from 'react';
import Button from "./UI/Button.jsx";
import {currencyFormatter} from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";

const BookItem = ({book})=> {

    const cartCtx = useContext(CartContext);

    const handleAddBookCart = () => {
        cartCtx.addItem(book);
    }

    return (
        <li className="book-item">
            <article>
                <img src={`http://localhost:3000/${book.image}`} alt={book.name}/>
                <div>
                    <h3>{book.name}</h3>
                    <p className="book-item-price">
                        {currencyFormatter.format(book.price)}
                    </p>
                    <p className="book-item-description">{book.description}</p>
                </div>
                <p className="book-item-actions">
                    <Button onClick={handleAddBookCart}>장바구니 담기</Button>
                </p>
            </article>
        </li>
    );
}

export default BookItem;