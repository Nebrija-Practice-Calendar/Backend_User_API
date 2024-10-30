import { Request, Response } from 'express';
//import { Classroom } from "../../../types.ts";
import { classroomModel } from "../../../db/classroom.ts";

export const putClassroomDetails = async (req: Request, res: Response) => {
  try {
    const { id,capacity,computers } = await req.body;

    if (!id || !capacity || !computers) {
      res.status(400).send('Some fields are required');

      return;
    }

    const existClassroom = await classroomModel.findByIdAndUpdate( id, { $set: { capacity, computers } }, { new: true, upsert: true }).exec();
    if (!existClassroom) {
      res.status(400).send('Classroom not exists');

      return;
    }

    res.status(200).send("Classroom update");

  } catch (error) {
    res.status(500).send(error);

  }
};
