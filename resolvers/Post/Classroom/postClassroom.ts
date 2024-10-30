import { Request, Response } from 'express';
import { Classroom } from "../../../types.ts";
import { classroomModel } from "../../../db/classroom.ts";

export const postClassroom = async (req: Request, res: Response) => {
  try {
    const {name} = req.body;
    if(!name) {
        res.status(404).send('Name are required');
    }
    const existClassroom = await classroomModel.findOne({name:name}).exec();
    if(existClassroom){
        res.status(404).send('Classroom already exist');
        return
    }
    const classroom = new classroomModel({
        name
    });
    await classroom.save();
    res.status(200).send("Classroom created");
  } catch (error) {
    res.status(404).send(error);
  }
};
