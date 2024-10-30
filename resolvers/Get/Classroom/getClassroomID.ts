import { Request, Response } from 'express';
import { Classroom } from "../../../types.ts";
import { classroomModel } from "../../../db/classroom.ts";

export const getClassroomID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subject = await classroomModel.findById(id).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
