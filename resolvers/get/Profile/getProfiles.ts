import { Request, Response } from 'express';
import { roleModel } from "../../../db/role.ts";

export const getProfiles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleModel.find().exec();
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).send(error);
  }
};
