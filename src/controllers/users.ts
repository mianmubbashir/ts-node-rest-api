import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";
import { validateUserUpdate } from "../validation/user.validation";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const { is_validated, status, message } = validateUserUpdate(req.body);
    if (is_validated === false) return res.status(status).send({ message });

    if (!username) {
      return res.status(400);
    }

    let user: any = await getUserById(id);

    Object.keys(req.body).forEach((key: string) => {
      user[key] = req.body[key];
    });

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
