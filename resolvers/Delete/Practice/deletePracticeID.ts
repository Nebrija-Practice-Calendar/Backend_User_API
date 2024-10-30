import { Request, Response } from 'express';
import { practiceModel } from "../../../db/practice.ts";

export const deletePracticeID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const practice = await practiceModel.findByIdAndDelete(id).exec();
    if(!practice){
        res.status(404).send('Practice not found');
        return;
    }
    res.status(200).json(practice);
  } catch (error) {
    res.status(404).send(error);
  }
};
