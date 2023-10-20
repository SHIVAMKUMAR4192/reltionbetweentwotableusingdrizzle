import express from 'express';
// const express = require('express');
import routes from './routes/userRoutes';
import orderRoute from './routes/orderRoutes';

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use('/api', routes);
app.use('/api', orderRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
