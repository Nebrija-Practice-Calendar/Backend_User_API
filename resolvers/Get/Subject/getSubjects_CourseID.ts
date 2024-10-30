import { Request, Response } from 'express';
import { Subject } from "../../../types.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const getSubjects_CourseID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subject = await SubjectModel.find({id_course:id}).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
