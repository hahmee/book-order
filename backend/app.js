import dotenv from 'dotenv';
dotenv.config(); // 이거 필수
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

// app.get('/books', async (req, res) => {
//   const books = await fs.readFile('./data/available-books.json', 'utf8');
//   res.json(JSON.parse(books));
// });
//

app.get('/books', async (req, res) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
      params: {
        query: '인문',
        size: 10,
        sort: 'accuracy',
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REST_API_KEY}`
      }
    });

    // ❗❗ 변경된 부분: return → res.json 으로 응답
    const books = response.data.documents.map(book => ({
      id: book.isbn,
      title: book.title,
      image: book.thumbnail,
      price: book.price,
      authors: book.authors,
      sale_price: book.sale_price,
      description: book.contents,
      publisher:book.publisher,
    }));

    res.json(books);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

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
