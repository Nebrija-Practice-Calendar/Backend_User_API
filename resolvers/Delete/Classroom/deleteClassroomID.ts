import { Request, Response } from 'express';
import { classroomModel } from "../../../db/classroom.ts";

export const deleteClassroomID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const classroom = await classroomModel.findByIdAndDelete(id).exec();
    if(!classroom){
        res.status(404).send('Classroom not found');
        return;
    }
    res.status(200).json(classroom);
  } catch (error) {
    res.status(404).send(error);
  }
};
