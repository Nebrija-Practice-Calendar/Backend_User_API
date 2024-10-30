import { Request, Response } from 'express';
import { semesterModel } from "../../../db/semester.ts";

export const postSemester = async (req: Request, res: Response) => {
  try {
    const {name} = req.body;
    if(!name) {
        res.status(404).send('Name are required');
    }
    const existSemester = await semesterModel.findOne({name:name}).exec();
    if(existSemester){
        res.status(404).send('Semester already exist');
        return
    }
    const semester = new semesterModel({
        name
    });
    await semester.save();
    res.status(200).send("Semester created");
  } catch (error) {
    res.status(404).send(error);
  }
};
