import { Router,Request,Response } from "express";
import { dbConnection } from "../db/connection";
import { InsertProduct, SelectProduct, product } from "../db/productSchema";

const productRouter = Router();

productRouter.post('/products', async (req: Request, res: Response) => {
    try {
      const productData: InsertProduct = req.body;
  
      const [insertedProduct]: SelectProduct[] = await dbConnection
        .insert(product)
        .values(productData)
        .returning();
  
      res.status(201).json(insertedProduct);
    } catch (error) {
      console.error('Error inserting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
   

  export default productRouter;