import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;



    const currentUserId = get(req, "identity._id") as string;

  console.log("id", currentUserId);


    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }




    next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["TESTING-COOKIE"];

    if (!sessionToken) {
      return res.status(403).send({ message: "Cookie is required" });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).send({ message: "User not found" });
    }

    merge(req, { identity: existingUser });

    req.body['user'] = {user_id: existingUser.id}


    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Internal Server Error" });
  }
};
