import { Request, Response } from 'express';
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";
import { ExceptionModel } from "../../../db/exception.ts";
import { PeriodModel } from "../../../db/period.ts";
import { Practices_Timetables } from "../../../types.ts";


async function config_week(): Promise<{maxDays:number,maxHours:number}> {
  const config_week = await config_week_timetableModel.findOne().exec();
  if(!config_week){
    return { maxDays: 0, maxHours: 0 };
  }
  const maxDays = config_week.generateDays.length;
  const maxHours = config_week.hours;
  return {maxDays,maxHours};
}

async function getClassCalendar(id_period:string,id_classroom:string): Promise<Practices_Timetables> {
  const practiceTimetable = await Practices_TimetablesModel.findOne({ id_period:id_period,id_classroom:id_classroom }).exec();

  if (!practiceTimetable) {
    return {
        id: "",
        id_period,
        id_classroom,
        Timetables: [{
            id: 0,
            Week_Timetable: Array.from({ length: 0 }, () => Array.from({ length: 0 }, () => "-"))
        }]
    }
  }
  return practiceTimetable as Practices_Timetables;
}

async function getExceptionsDays(id_period: string, practiceTimetable: Practices_Timetables, maxDays: number, maxHours: number): Promise<Practices_Timetables> {
  // Buscar el periodo
  const period = await PeriodModel.findById(id_period).exec();
  if (!period) {
    return practiceTimetable;
  }
  console.log("Periodo:", period);

  // Buscar excepciones y mapear a tipo Exception
  const exceptions = await ExceptionModel.find({ id_period: period._id }).exec();
  console.log("Excepciones:", exceptions);

  if (!exceptions || exceptions.length === 0) {
    return practiceTimetable;
  }

  // Convertir las fechas del periodo a objetos Date
  const startDatePeriod = new Date(period.start_date);
  const endDatePeriod = new Date(period.end_date);

  exceptions.forEach((exception) => {
    const startDateException = new Date(exception.start_date);
    const endDateException = new Date(exception.end_date);
    console.log("Excepción:", exception);
    console.log("Fecha de inicio de la excepción:", startDateException);
    console.log("Fecha de fin de la excepción:", endDateException);

    // Asegurarse de que la excepción esté dentro del periodo
    if (startDateException > endDatePeriod || endDateException < startDatePeriod) {
      return; // Si la excepción está fuera del periodo, saltarla
    }

    // Ajustar el rango de la excepción para estar dentro del periodo
    const validStartDate = startDateException < startDatePeriod ? startDatePeriod : startDateException;
    const validEndDate = endDateException > endDatePeriod ? endDatePeriod : endDateException;
    console.log("Fecha de inicio válida:", validStartDate);
    console.log("Fecha de fin válida:", validEndDate);

    // Calcular los días afectados dentro del periodo
    const daysFromStartOfPeriod = Math.floor((validStartDate.getTime() - startDatePeriod.getTime()) / (1000 * 60 * 60 * 24));
    const daysToEndOfException = Math.floor((validEndDate.getTime() - startDatePeriod.getTime()) / (1000 * 60 * 60 * 24));

    console.log("Días afectados por la excepción:", daysFromStartOfPeriod, daysToEndOfException);

    // Iterar sobre las semanas del timetable
    practiceTimetable.Timetables.forEach(week => {
      // Calcular el índice de día en el timetable para las fechas de la excepción

      if (!Array.isArray(week.Week_Timetable)) {
        console.error("Week_Timetable no es un array o no está definido para la semana:", week.id);
        return;
      }

      for (let dayIndex = daysFromStartOfPeriod; dayIndex <= daysToEndOfException; dayIndex++) {
        const weekIndex = Math.floor(dayIndex / 7)+1; // Calcular la semana
        const dayOfWeekIndex = dayIndex % 7;

        if (week.id === weekIndex) {

          if(dayOfWeekIndex < maxDays){
            week.Week_Timetable[dayOfWeekIndex].forEach((_hour, hourIndex) => {
              if (hourIndex < maxHours) {
                week.Week_Timetable[dayOfWeekIndex][hourIndex] = exception._id.toString();
              }
            });
          }
        }
      }
    });
  });

  return practiceTimetable;
}


export const getCalendarHours = async (req: Request, res: Response) => {
  try {
    const id_period = req.query.id_period as string;
    const id_classroom = req.query.id_classroom as string;

    if (!id_period) {
      return res.status(400).json({ message: "Bad request: missing id_period parameter" });
    }

    const { maxDays, maxHours } = await config_week();

    if (maxDays === 0 || maxHours === 0) {
      return res.status(404).json({ message: "No se encontró la configuración de la semana" });
    }

    const practiceTimetable = await getClassCalendar(id_period,id_classroom);

    if(!practiceTimetable){
      return res.status(404).json({ message: "No se encontró la práctica" });
    }
    //Aquí Implementar la lógica de las excepciones
    const practiceTimetableWithExceptions = await getExceptionsDays(id_period, practiceTimetable, maxDays, maxHours);


    //console.log("Objeto practiceTimetable modificado:", practiceTimetable);
    console.log(practiceTimetableWithExceptions)
    if (practiceTimetableWithExceptions.Timetables[0].Week_Timetable.length === 0) {
      return res.status(201).json({ message: "No se han encontrado horas disponibles para la selección actual." });
    }
    return res.status(200).json({practiceTimetableWithExceptions})
  } catch (error) {
    console.error("Error al obtener horas disponibles:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
