import { Request, Response } from 'express';
import { courseModel } from "../../../db/course.ts";

export const getCourse = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subject = await courseModel.findById(id).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
