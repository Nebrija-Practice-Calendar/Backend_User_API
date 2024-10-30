import { Request, Response } from 'express';
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
//import { Subjects_TimetablesModel } from "../../db/subjects_timetables.ts";
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";
import { PeriodModel } from "../../../db/period.ts";
import { Practice, Period } from "../../../types.ts";

type Timetable= {
    id:number,
    Week_Timetable:(string | string[])[][]
}
async function calculatePeriod(id_period:string): Promise<number> {
    const period = await PeriodModel.findOne({_id:id_period}).exec();
    if(!period){
        return 0;
    }
    const start = new Date(period.start_date);
    const end = new Date(period.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

    return diffWeeks;
}



function generateMatrix(numArrays: number, numElements: number): string[][] {
    return Array.from({ length: numArrays }, () => Array(numElements).fill("-"));
}

function generateTimetables(number_weeks: number, Matriz:string[][]): Promise<Timetable[]> {
    return Promise.resolve(
        Array.from({ length: number_weeks }, (_, index) => ({
            id: index + 1,
            Week_Timetable: Matriz
        }))
    );
}


export const postCreatePractices_Timetables = async (req: Request, res: Response) => {
  try {
    const {id_classroom,id_period} = req.body;
    console.log(req.body);
    if(!id_period || !id_classroom) {
        res.status(404).send('Period and Course are required');
    }
    const existPractice_Timetables = await Practices_TimetablesModel.findOne({id_period:id_period,id_classroom:id_classroom}).exec();
    if(existPractice_Timetables){
        res.status(404).send('Practices Timetable already exists');
        return;
    }
    const config_week = await config_week_timetableModel.findOne().exec();
    if(!config_week){
        res.status(404).send('Week Timetable not found');
        return;
    }
    const number_days = config_week.generateDays.length;
    const number_hours = config_week.hours;
    const number_weeks = await calculatePeriod(id_period);
    const Matriz = generateMatrix(number_days, number_hours);
    const Timetables = await generateTimetables(number_weeks,Matriz);
    console.log(Timetables);
    const Practice_Timetables = new Practices_TimetablesModel({
        id_period,
        id_classroom,
        Timetables:Timetables
    });
    await Practice_Timetables.save();
    res.status(200).send("Subjects_Timetables created");
  } catch (error) {
    res.status(404).send(error);

  }
};

