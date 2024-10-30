import { Request, Response } from 'express';
import { Subject } from "../../../types.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const getSubjects = async (_req: Request, res: Response) => {
  try {
    /* Plantear con Fernando si es necesario filtrar por id_Course_and_Group e id_Period
    const { id_Course_and_Group,id_Period } = req.params;
    if (!id_Course_and_Group || !id_Period) {
      res.status(400).send("Bad request missing parameters");
      return;
    }
    const subject = await SubjectModel.find({id_Course_and_Group:id_Course_and_Group,id_Period:id_Period}).exec();
    */
    const subject = await SubjectModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
