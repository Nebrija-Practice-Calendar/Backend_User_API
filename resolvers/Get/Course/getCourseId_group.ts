import { Request, Response } from 'express';
import { courseModel } from "../../../db/course.ts";

export const getCourseId_group = async (req: Request, res: Response) => {
  try {
    const id_course_and_group = req.query.id_course_and_group as string;
    const subject = await courseModel.findOne({id_course_and_group:id_course_and_group}).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
