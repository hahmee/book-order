import React from 'react';
import Error from "./Error.jsx";
import BookItem from "./BookItem.jsx";
import useHttp from "./hooks/useHttp.js";

const requestConfig = {};

const Books = () =>{
    const {data: loadedBooks,isLoading,error} = useHttp('http://localhost:3000/books', requestConfig, []);

    // const [loadData, setLoadData] = useState([]);
    // useEffect(() => {
    //     const loadData = async () => {
    //         const data = await fetch('http://localhost:3000/books').then(res => res.json());
    //         console.log('data',data)
    //         setLoadData(data)
    //     }
    //     loadData();
    // }, []);

    if(isLoading) {
        return <p className="center">로딩 중...</p>;
    }

    if (error) {
        return <Error title="책 정보를 가져오는데 실패했습니다." message ={error}/>

    }
    return (
        <ul id="books">
            {loadedBooks.map((book) => (
                <BookItem key={book.id} book={book}/>
            ))}
        </ul>
    );
}

export default Books;