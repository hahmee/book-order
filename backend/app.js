import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/books', async (req, res) => {
  const books = await fs.readFile('./data/available-books.json', 'utf8');
  res.json(JSON.parse(books));
});
//
// app.get('/books', async (req, res) => {
//   try {
//     // 쿼리 파라미터 'q'를 통해 검색어를 전달할 수 있고, 기본값은 'fiction'입니다.
//     const { q = 'history' } = req.query;
//     const googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';
//
//     const response = await axios.get(googleBooksUrl, {
//       params: {
//         q,
//         maxResults: 10,  // 필요에 따라 최대 결과 수 조정 가능
//       }
//     });
//
//     // Google Books API의 데이터를 원하는 형태로 가공
//     const booksData = response.data.items.map(item => {
//       const volumeInfo = item.volumeInfo || {};
//       const saleInfo = item.saleInfo || {};
//
//       return {
//         id: item.id,
//         name: volumeInfo.title,
//         price: saleInfo.listPrice ? saleInfo.listPrice.amount : '가격 정보 없음',
//         description: volumeInfo.description || '설명 없음',
//         image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : null
//       };
//     });
//
//     res.json(booksData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer['phone-number'] === null ||
    orderData.customer['phone-number'].trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.address === null ||
    orderData.customer.address.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, phone number, postal code or adress is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
