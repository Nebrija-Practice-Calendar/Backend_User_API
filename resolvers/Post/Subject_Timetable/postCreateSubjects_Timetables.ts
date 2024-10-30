import { Request, Response } from 'express';
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";

function generateMatrix(numArrays: number, numElements: number): string[][] {
  return Array.from({ length: numArrays }, () => Array(numElements).fill("-"));
}

export const postCreateSubjects_Timetables = async (req: Request, res: Response) => {
  try {
    const {id_period,id_course} = req.body;
    if(!id_period || !id_course  ) {
        res.status(404).send('Period and Course are required');
    }
    const existSubjects_Timetables = await Subjects_TimetablesModel.findOne({id_period:id_period,id_course:id_course}).exec();
    if(existSubjects_Timetables){
        res.status(404).send('Subjects_Timetables already exist');
        return
    }
    const config_week = await config_week_timetableModel.findOne().exec();
    const number_days = config_week?.generateDays.length || 5;
    const number_hours = config_week?.hours || 14;

    const Matriz = generateMatrix(number_days, number_hours);
    const Subjects_Timetables = new Subjects_TimetablesModel({
        id_period,
        id_course,
        Timetables:Matriz
    });
    await Subjects_Timetables.save();
    res.status(200).send("Subjects_Timetables created");
  } catch (error) {
    res.status(404).send(error);

  }
};
