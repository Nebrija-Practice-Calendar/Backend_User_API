import { Request, Response } from 'express';
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
import { practiceModel } from "../../../db/practice.ts";
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";
import { Practices_Timetables, Practice } from "../../../types.ts";



export const putPractices_Timetables = async (req: Request, res: Response) => {
  try {
    const {id,id_week,id_practice,idxRange, day} = req.body;
    if (!id || !id_week || !id_practice || !idxRange || day === undefined) {
      res.status(400).send('Subject and Hours are required');
      console.log('Subject and Hours are required');
      return;
    }

    const practicesTimetables = await Practices_TimetablesModel.findById(id).exec();
    if (!practicesTimetables) {
      res.status(404).send('Subjects_Timetables does not exist');
      console.log('Subjects_Timetables does not exist');
      return;
    }

    const practice = await practiceModel.findById(id_practice).exec();
    if (!practice) {
      res.status(404).send('Practice does not exist');
      console.log('Practice does not exist');
      return;
    }

    const timetable = practicesTimetables.Timetables.find(t => t.id === id_week);
    if (!timetable) {
      res.status(404).send('Timetable for the specified week not found');
      console.log('Timetable for the specified week not found');
      return;
    }
    const [minIdx, maxIdx] = idxRange;
    if (minIdx === undefined || maxIdx === undefined) {
      res.status(400).send('Invalid index range');
      console.log('Invalid index range');
      return;
    }

    const updateOps = {};
    for (let i = minIdx; i <= maxIdx; i++) {
      updateOps[`Timetables.$.Week_Timetable.${day}.${i}`] = practice._id.toString();
    }

    const updateResult = await Practices_TimetablesModel.updateMany(
      { _id: id, "Timetables.id": id_week },
      { $set: updateOps }
    ).exec();

    if (!updateResult.nModified === 0) {
      res.status(404).send('Subjects_Timetables does not exist or Timetable for the specified week not found');
      console.log('Subjects_Timetables does not exist or Timetable for the specified week not found');
      return;
    }

    console.log("Updated timetable for week: ", id_week, " on day: ", day);

    res.status(200).send('Practice added to timetable');
  } catch (error) {
    res.status(404).send(error);

  }
};
