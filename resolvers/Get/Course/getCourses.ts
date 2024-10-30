import { Request, Response } from 'express';
import { courseModel } from "../../../db/course.ts";

export const getCourses = async (_req: Request, res: Response) => {
  try {
    const subject = await courseModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
