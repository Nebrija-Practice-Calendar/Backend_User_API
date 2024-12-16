import { Request, Response } from 'express';
import { roleModel } from "../../../db/role.ts";

export const deleteProfileID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const role = await roleModel.findByIdAndDelete(id).exec();
    if(!role){
        res.status(404).send('Role not found');
        return;
    }
    res.status(200).json({ message: 'Role eliminado exitosamente' });
  } catch (error) {
    res.status(404).send(error);
  }
};
