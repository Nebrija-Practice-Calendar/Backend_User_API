import { Request, Response } from 'express';
import { Subject } from "../../../types.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const deleteSubjectID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subject = await SubjectModel.findByIdAndDelete (id).exec();
    if(!subject){
        res.status(404).send('Subject not found');
        return;
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
