import { Request, Response } from 'express';
import { classroomModel } from "../../../db/classroom.ts";

export const getClassrooms = async (_req: Request, res: Response) => {
  try {
    const subject = await classroomModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
