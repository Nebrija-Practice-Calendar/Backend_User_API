import { Request, Response } from 'express';
import { RoleType } from "../../../types.ts";
import { roleModel } from "../../../db/role.ts";
import { verify } from '@denorg/scrypt';


export const postProfile = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if(!name){
      res.status(400).send('Name and description are required');
      return;
    }
    const validDescription = description && description.length >= 10 ? description : null;

    const role = await roleModel.findOne({ name: name }).exec();
    if (role) {
      res.status(404).send('Role found');
      return;
    }
    const newRole = new roleModel({
      name,
      description: validDescription || 'No description'
    });

    await newRole.save();
    res.status(200).send("Role created");
  } catch (error) {
    res.status(404).send(error);
  }
};
