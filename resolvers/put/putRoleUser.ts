import { Request, Response } from 'express';
import { userModel } from "../../db/user.ts";

export const putRoleUser= async (req: Request, res: Response) => {
  try {
    const {id,role } = req.body;
    if(!id||!role) {
        res.status(404).send('ID and Role are required');
    }
    const user = await userModel.findByIdAndUpdate(
        id,
        role
    ).exec();
    if(!user){
        res.status(404).send('User not found');
        return
    }
    res.status(200).send('Role updated');
  } catch (error) {
    res.status(404).send(error);
  }
};
