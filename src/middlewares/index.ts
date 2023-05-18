import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
         
        if(!currentUserId){
            return res.status(403);
        }

        if(currentUserId.toString() !== id){
           return res.status(403);
        }

        next();
    } catch(error){
        console.log(error);
        return res.status(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['TESTING-COOKIE']

        if(!sessionToken){
            return res.status(403).send({ message: 'forbidden'});
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.status(403).send({ message: 'fobidden1'});
        }

        merge(req, { identity: existingUser });
        
        return next();
 
    } catch(error){
       console.log(error);
       return res.status(400).send({message: 'Internal Server Error'});
    }
}