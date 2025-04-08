import React, {useContext, useState} from 'react';
import Button from "./UI/Button.jsx";
import {currencyFormatter} from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";

const BookItem = ({book})=> {
    const cartCtx = useContext(CartContext);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddBookCart = () => {
        cartCtx.addItem(book);
    };

    const toggleDescription = () => {
        setIsExpanded(prev => !prev);
    };

    const description = isExpanded
        ? book.description
        : book.description.slice(0, 100) + (book.description.length > 100 ? '...' : '');

    return (
        <li className="book-item">
            <article>
                <img
                    src={book.image && book.image.trim() !== '' ? book.image : 'https://covers.openlibrary.org/b/id/10909258-L.jpg'}
                    alt={book.title}
                />
                <div>
                    <h3>{book.title}</h3>
                    <p className="book-item-price">
                        {currencyFormatter.format(book.price)}
                    </p>
                    <p className="book-item-description">{description}</p>
                    {book.description.length > 100 && (
                        <div className="text-button" onClick={toggleDescription}>
                            {isExpanded ? '접기' : '더보기'}
                        </div>
                    )}
                </div>
                <p className="book-item-actions">
                    <Button onClick={handleAddBookCart}>장바구니 담기</Button>
                </p>
            </article>
        </li>
    );
};

export default BookItem;
