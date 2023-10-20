import { Router, Request, Response } from 'express';

import {dbConnection} from "../db/connection";
import { InsertUser, SelectUser, profiles, user } from "../db/userschema";
import { eq } from 'drizzle-orm';
const router = Router();

router.post('/users', async (req: Request, res: Response) => {
    try {
      const userData: InsertUser = req.body; 
  
      const [insertedUser]: SelectUser[] = await dbConnection.insert(user).values(userData).returning();
  
      res.status(201).json(insertedUser);
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await dbConnection.select().from(user);
    console.log('Users:', users); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/users/:id',async (req:Request, res:Response) =>{
    try{
        const {id} =req.params;
        const users = await dbConnection
        .select()
        .from(user)
        .where
        (eq(user.id, Number(id)))
        res.json(users);
        console.log('get user by id', users)
    }catch(error){
        res.status(500).json({ error:'Internal server error'});
    }
})
router.put('/userUpdate/:id', async (req:Request,res:Response) =>{
    try{
        const { id } = req.params;
        const userData: Partial<SelectUser> = req.body;

        const existingUser = await dbConnection.select().from(user).where(eq(user.id, Number(id)));
        if (!existingUser){
            return res.status(404).json({error:'user not found'});
        }
         const updateduser = await dbConnection.update(user).set(userData).where (eq(user.id, Number(id))).returning();
        res.json(updateduser)
        console.log('updated data',updateduser)
    }catch(error){
        res.status(500).json({ error:'Internal server error'});
    }
})

router.delete('/userDelete/:id', async(req:Request,res:Response) =>{
    
const { id } =req.params;
const deletedUser= await dbConnection.delete(user).where(eq(user.id,Number(id))).returning();
if (!deletedUser) {
return res.status(404).json({ error: 'User not found' });
  }
  
res.json(deletedUser);
console.log("deletedUser", deletedUser)
})


router.get('/profiles/:userid', async(req, res) =>{
try{
    const { userid } = req.params;

    const userProfiles = await dbConnection
    .select()
    .from(profiles)
    .where(eq(profiles.userid, Number(userid)));
    console.log('userProfile', userProfiles)
    if (userProfiles && userProfiles.length > 0) {
        res.status(200).json(userProfiles);
      } else {
        res.status(404).json({ error: 'No profiles found for the specified user.' });
      }

    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

})


export default router;
