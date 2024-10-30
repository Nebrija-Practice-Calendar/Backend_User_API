import { Request, Response } from 'express';
import { userModel } from "../../db/user.ts";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.find().select('username role email').exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};
