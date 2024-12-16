import { Request, Response } from 'express';
import { UserType } from "../../../types.ts";
import { userModel } from "../../../db/user.ts";
import { hash } from '@denorg/scrypt';


export const postRegisterUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password|| !email) {
      res.status(404).send('Username, Email and password are required');
    }
    const user = await userModel.findOne({ username: username }).exec();
    if (user) {
      res.status(404).send('User found');
      return;
    }
    const role = "user";
    const hashedPassword = await hash(password);
    const newUser = new userModel({
        username,
        password: hashedPassword,
        email,
        role
    });
    await newUser.save();
    const usercreate:Omit<UserType, 'password'> = newUser.toObject();
    res.status(201).send(usercreate);
  } catch (error) {
    res.status(404).send(error);
  }
};
