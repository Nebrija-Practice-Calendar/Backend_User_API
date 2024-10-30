import { Request, Response } from 'express';
import { userModel } from "../../db/user.ts";

export const deleteUserID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const user = await userModel.findByIdAndDelete(id).exec();
    if(!user){
        res.status(404).send('Classroom not found');
        return;
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(404).send(error);
  }
};
