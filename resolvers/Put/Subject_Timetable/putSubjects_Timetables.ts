import { Request, Response } from 'express';
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";

export const putSubjects_Timetables = async (req: Request, res: Response) => {
  try {
    const {id,id_subject,idxRange, day} = req.body;
    console.log(req.body);
    if(!id||!id_subject || !idxRange || day === undefined) {
        res.status(404).send('Subject and Hours are required');
        console.log('Subject and Hours are required');
    }
    const Subjects_Timetables = await Subjects_TimetablesModel.findById(id).exec();
    if(!Subjects_Timetables){
        res.status(404).send('Subjects_Timetables not exist');
        console.log('Subjects_Timetables not exist');
        return
    }
    /*
    for (let i = idxRange[0]; i <= idxRange[1]; i++) {
      Subjects_Timetables.Timetables[day][i] = id_subject;
    }
    */
    Subjects_Timetables.Timetables[day].fill(id_subject, idxRange[0], idxRange[1] + 1);
    await Subjects_Timetables.save();
    res.status(200).send("Subjects_Timetables have been updated");
    console.log("Subjects_Timetables have been updated");
  } catch (error) {
    res.status(404).send(error);

  }
};
