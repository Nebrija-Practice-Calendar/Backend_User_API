import ExcelJS from 'exceljs';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { practiceModel } from "../../../db/practice.ts";
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
import { SubjectModel } from "../../../db/subject.ts";
import { PeriodModel } from "../../../db/period.ts";
import { semesterModel } from "../../../db/semester.ts";
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { courseModel } from "../../../db/course.ts";
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";
import { classroomModel } from "../../../db/classroom.ts";

type Practica = {
  profesor: string;
  grupo: string;
  num_alumnos: number | string;
  asignatura: string;
  semestre: string;
  practica: string;
  dia: string;
  horas: string;
  necesidades: string;
  aula: string;
  modificacion: string;
};

type weeksArray = {
  id: number;
  week: string[];
}[];



/*
async function Excel(){
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile('static\Horarios_Practicas.xlsx');
  const worksheet = workbook.getWorksheet(1); // Selecciona la primera hoja del Excel
  console.log(worksheet);
}
*/


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

async function getPractice(id: string, id_period: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }

  const practice = await practiceModel.findOne({ _id: new mongoose.Types.ObjectId(id), id_period }).exec();
  return practice;
}

function convertirHoraAMinutos(hora: string): number {
  // Divide la cadena en horas y minutos
  const [horas, minutos] = hora.split(":").map(Number);

  // Convierte las horas a minutos y suma los minutos
  return horas * 60 + minutos;
}

function transformarPrácticas(practices: Practica[][], minutes: number): Practica[] { //REVISAR
  const result: Practica[] = [];

  practices.forEach((practiceArray) => {
    let mergedPractice: Practica | null = null;

    practiceArray.forEach((practice) => {
      if (!mergedPractice) {
        mergedPractice = { ...practice }; // Crear una copia del primer objeto
      } else {
        // Ajustar las horas
        const [lastStartTime, lastEndTime] = mergedPractice.horas.split(" - ");
        const [currentStartTime, currentEndTime] = practice.horas.split(" - ");

        // Convertir las horas a minutos para facilitar las comparaciones
        const lastEndInMinutes = convertirHoraAMinutos(lastEndTime);
        const currentStartInMinutes = convertirHoraAMinutos(currentStartTime);

        // Si la diferencia entre el final de la última práctica y el inicio de la siguiente es menor o igual a `minutes`
        if (currentStartInMinutes - lastEndInMinutes <= minutes) {
          // Extender el rango de horas
          mergedPractice.horas = lastStartTime + " - " + currentEndTime;
        } else {
          // Si no son contiguas, agregar el bloque al resultado y empezar uno nuevo
          result.push(mergedPractice);
          mergedPractice = { ...practice }; // Comenzar una nueva práctica
        }
      }
    });

    // Agregar el último bloque del día
    if (mergedPractice) {
      result.push(mergedPractice);
    }
  });

  return result;
}


export const getExcelPracticeCalendar = async (req: Request, res: Response) => {
  try {
    const id_period = req.query.id_period as string;

    const config_week = await config_week_timetableModel.findOne().exec();
    if (!config_week) {
      res.status(404).send('Config week not found');
      return;
    }

    const period = await PeriodModel.findById(id_period).exec();
    if (!period) {
      res.status(404).send('Period not found');
      return;
    }

    const semester = await semesterModel.findById(period.id_semester).exec();
    if (!semester) {
      res.status(404).send('Semester not found');
      return;
    }

    const groups = await Courses_and_GroupsModel.find().exec();
    if (!groups) {
      res.status(404).send('Groups not found');
      return;
    }
    const groupIds = groups.map(group => group.id);

    const course = await courseModel.find({ id_course_and_group: { $in: groupIds } }).exec();
    if (!course) {
      res.status(404).send('Course not found');
      return;
    }


    const subjects = await SubjectModel.find({ id_course: { $in: course.map(c => c.id)}, id_semester:semester._id  }).exec();
    if(!subjects){
      res.status(404).send('Subjects not found');
      return;
    }

    const practices_timetables = await Practices_TimetablesModel.find({ id_period }).exec();
    if (!practices_timetables) {
      res.status(404).send('Practices Timetables not found');
      return;
    }

    const classrooms = await classroomModel.find().exec();
    if (!classrooms) {
      res.status(404).send('Classrooms not found');
      return;
    }
    const allPractices = await Promise.all(practices_timetables.map(async (practice_timetable) => {
      const classroom = await classroomModel.findById(practice_timetable.id_classroom).exec();
      if (!classroom) {
        return [];
      }
      const calendar = await getCalendarWeeksDays(id_period, practice_timetable.id_classroom);

      const practices: Practica[] = [];

      for (const week of practice_timetable.Timetables) {
        const id_week = week.id;
        const calendar_days = calendar.find((week) => week.id === id_week);

        for (let dayIndex = 0; dayIndex < week.Week_Timetable.length; dayIndex++) {
          const days = week.Week_Timetable[dayIndex];
          const dayName = calendar_days?.week[dayIndex];
          //contador de días
          for (let index = 0; index < days.length; index++) {
            const hour = days[index];

            if (hour === '-' || Array.isArray(hour)) continue;

            const practice = await getPractice(hour,period._id);

            const hours = config_week.generateHours[index];
            const subject = subjects.find((subject) => subject.code === practice.id_subject);

            practices.push({
              profesor: '',
              grupo: groups.find((group) => group.id === practice.id_course_and_group)?.name || '',
              num_alumnos: '',
              asignatura: subject?.name || '',
              semestre: semester.name,
              practica: practice.name,
              dia: dayName || '',
              horas: hours || '',
              necesidades: '',
              aula: classroom.name,
              modificacion: '',
            });
          }
        }
      }

      return practices;
    }));
    console.log(allPractices);

    const  minuteshour= config_week.minutes;
    const allPracticesTransformed=transformarPrácticas(allPractices,minuteshour);


    res.status(200).send(allPracticesTransformed);
  } catch (error) {
    res.status(404).send(error);
  }
};


