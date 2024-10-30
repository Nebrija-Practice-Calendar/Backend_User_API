import { Request, Response } from 'express';
import { Subject } from "../../../types.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const getSubjects_CourseIDs = async (req: Request, res: Response) => {
  try {
    const id_course = req.query.id_course as string;
    const id_semester = req.query.id_semester as string;
    const subjects = await SubjectModel.find({
      id_course: id_course,
      id_semester: id_semester
    }).exec();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(404).send(error);
  }
};
