import { Request, Response } from 'express';
import { Subject } from "../../../types.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const postSubject = async (req: Request, res: Response) => {
  try {
    const {id_course,id_semester,code, name, colour} = req.body;
    console.log(req.body);
    if(!id_course||!id_semester||!name || !code || !colour) {
        res.status(404).send('Course, Code, Name and colour are required');
    }
    const existSubject = await SubjectModel.findOne({name:name,id_course:id_course}).exec();
    if(existSubject){
        res.status(404).send('Subject already exist');
        return
    }
    const subject = new SubjectModel({
      id_course,
      id_semester,
      name,
      code,
      colour
    });
    await subject.save();

    res.status(200).send("Subject created");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
