import { Request, Response } from 'express';
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
import { practiceModel } from "../../../db/practice.ts";

export const deletePractice_Practice_Timetable = async (req: Request, res: Response) => { //Revisar porque no se actualiza la base de datos
  try {
    const { id, id_week, idxRange, day } = req.body;

    if (!id || !id_week || !idxRange || day === undefined) {
      res.status(400).send('Subject and Hours are required');
      console.log('Subject and Hours are required');
      return;
    }


    const practicesTimetables = await Practices_TimetablesModel.findById(id).exec();
    if (!practicesTimetables) {
      res.status(404).send('Subjects_Timetables not exist');
      console.log('Subjects_Timetables not exist');
      return;
    }

    const timetableIndex: number = practicesTimetables.Timetables.findIndex(t => t.id === id_week);
    if (timetableIndex === -1) {
      res.status(404).send('Week_Timetable not found');
      console.log('Week_Timetable not found');
      return;
    }

    const weekTimetable = practicesTimetables.Timetables[timetableIndex].Week_Timetable[day];
    if (!weekTimetable) {
      res.status(404).send('Day not found in Timetables');
      console.log('Day not found in Timetables');
      return;
    }

    const deletedPracticeIds: string[] = idxRange.map((idx: number) => weekTimetable[idx]).filter(Boolean);

    const deletionResult = await practiceModel.deleteMany({ _id: { $in: deletedPracticeIds } }).exec();
    console.log("Prácticas eliminadas del modelo: ", deletionResult);

    const updatedWeekTimetable = weekTimetable.map((practiceId: string) =>
      deletedPracticeIds.includes(practiceId) ? "-" : practiceId
    );

    const updateResult = await Practices_TimetablesModel.findOneAndUpdate(
      { _id: id, "Timetables.id": id_week },
      { $set: { [`Timetables.$.Week_Timetable.${day}`]: updatedWeekTimetable } },
      { new: true }
    ).exec();

    if (!updateResult) {
      res.status(404).send('Failed to update Week_Timetable');
      console.log('Failed to update Week_Timetable');
      return;
    }

    res.status(200).send("Subjects_Timetables have been updated and relevant practices deleted if necessary");
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the practice.');
  }
};
