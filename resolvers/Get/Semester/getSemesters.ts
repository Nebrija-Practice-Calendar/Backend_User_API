import { Request, Response } from 'express';
import { semesterModel } from "../../../db/semester.ts";

export const getSemesters = async (_req: Request, res: Response) => {
  try {
    const semester = await semesterModel.find().exec();
    res.status(200).json(semester);
  } catch (error) {
    res.status(404).send(error);
  }
};
