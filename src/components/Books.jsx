import React, {useEffect, useState} from 'react';
import Button from "./UI/Button.jsx";
import BookItem from "./BookItem.jsx";

const Books = () =>{
    const [loadData, setLoadData] = useState([]);
    useEffect(() => {

        const loadData = async () => {
            const data = await fetch('http://localhost:3000/books').then(res => res.json());
            console.log('data',data)
            setLoadData(data)
        }

        loadData();

    }, []);

    return (
        <ul id="books">
            {loadData.map((book) => (
                <BookItem key={book.id} book={book}/>
            ))}
        </ul>
    );
}

export default Books;