import { Request, Response } from 'express';
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
import { PeriodModel } from "../../../db/period.ts";

type weeksArray = {
  id: number;
  week: string[];
}[];

async function getCalendarWeeksDays(id_period: string, id_classroom: string): Promise<weeksArray> {
  const [config, weeksclass, period] = await Promise.all([
    config_week_timetableModel.findOne().exec(),
    Practices_TimetablesModel.find({ id_classroom, id_period }).exec(),
    PeriodModel.findById(id_period).exec(),
  ]);

  if (!config || !weeksclass || !period) {
    return [];
  }

  const { generateDays: daysWeekName } = config;
  const startDate = new Date(period.start_date);
  const endDate = new Date(period.end_date);

  const weeksArray: weeksArray = [];

  weeksclass.forEach((WeeksList) => {
    const weeksClassNumber = WeeksList.Timetables.length;

    for (let weekIndex = 0; weekIndex < weeksClassNumber; weekIndex++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + weekIndex * 7);

      if (weekStartDate > endDate) break;

      const daysInWeek: string[] = [];

      for (let dayIndex = 0; dayIndex < daysWeekName.length; dayIndex++) {
        const currentDay = new Date(weekStartDate);
        currentDay.setDate(weekStartDate.getDate() + dayIndex);

        if (currentDay > endDate) break;

        const formattedDate = currentDay.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        daysInWeek.push(`${daysWeekName[dayIndex]}, ${formattedDate}`);
      }

      weeksArray.push({
        id: weekIndex + 1,
        week: daysInWeek,
      });
    }
  });

  return weeksArray;
}


export const getDaysCalendar = async (req: Request, res: Response) => {
  try {
    const id_period = req.query.id_period as string;
    const id_classroom = req.query.id_classroom as string;
    const result = await getCalendarWeeksDays(id_period, id_classroom);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};
