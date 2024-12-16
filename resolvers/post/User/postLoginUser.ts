import { Request, Response } from 'express';
//import { UserType } from "../../../types.ts";
import { userModel } from "../../../db/user.ts";
import { verify } from '@denorg/scrypt';


export const postLoginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).send('Email and password are required');
    }
    const user = await userModel.findOne({ username: username }).exec();
    console.log(user);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const isMatch = await verify(password,user.password);
    if (isMatch) {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      console.log(userWithoutPassword);
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: userWithoutPassword });
    } else {
    res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
