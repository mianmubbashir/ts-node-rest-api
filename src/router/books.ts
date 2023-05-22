import express from "express";

import { create, get, getAll, getByUserId, remove, update } from "../controllers/books";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.post("/book", isAuthenticated, create);
  router.get("/book/:id", isAuthenticated, getAll);
  router.get("/book/user", isAuthenticated, getByUserId);
  router.get("/book/:id", isAuthenticated, get);
  router.delete("/book/:id", isAuthenticated, isOwner, remove);
  router.patch("/book/:id", isAuthenticated, isOwner, update);
};
