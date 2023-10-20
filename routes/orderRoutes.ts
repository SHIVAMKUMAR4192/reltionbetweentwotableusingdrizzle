import { Router, Request, Response } from 'express';
import { dbConnection } from '../db/connection';
import { InsertOrder, SelectOrder, order } from '../db/orderSchema';

const orderRoute = Router();

orderRoute.post('/orders', async (req: Request, res: Response) => {
  try {
    const orderData: InsertOrder = req.body;

    const [insertedOrder]: SelectOrder[] = await dbConnection
      .insert(order)
      .values(orderData)
      .returning();

    res.status(201).json(insertedOrder);
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


orderRoute.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await dbConnection.select().from(order);
    console.log('getorders', orders)
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default orderRoute;



