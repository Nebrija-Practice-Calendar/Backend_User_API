import { Request, Response } from 'express';
import { degreeModel } from "../../../db/degree.ts";

export const deleteDegreeID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const degree = await degreeModel.findByIdAndDelete(id).exec();
    if(!degree){
        res.status(404).send('Degree not found');
        return;
    }
    res.status(200).json(degree);
  } catch (error) {
    res.status(404).send(error);
  }
};
