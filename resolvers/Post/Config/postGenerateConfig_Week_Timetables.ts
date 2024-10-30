import { Request, Response } from 'express';
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";


function generatehours(horaInicial: string, minutosIntervalo: number, cantidadBloques: number): string[] {
  const horas = [];
  let [hora, minutos] = horaInicial.split(':').map(Number);

  for (let i = 0; i < cantidadBloques; i++) {
    let inicio = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    minutos += minutosIntervalo;
    if (minutos >= 60) {
      minutos -= 60;
      hora += 1;
    }
    let fin = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    horas.push(`${inicio} - ${fin}`);

    const tiempoLibre = minutosIntervalo < 60 ? 60 - minutosIntervalo : 0;
    minutos += tiempoLibre;

  }
    return horas;
  }

function generateDaysWeek(star_date: string, end_date: string): string[] {
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const indiceInicio = diasSemana.indexOf(star_date);
  const indiceFin = diasSemana.indexOf(end_date);

  if (indiceInicio === -1 || indiceFin === -1) {
    throw new Error("Día de inicio o fin no válido");
  }

  const days = indiceInicio <= indiceFin
  ? diasSemana.slice(indiceInicio, indiceFin + 1)
  : diasSemana.slice(indiceInicio).concat(diasSemana.slice(0, indiceFin + 1));

  return days;
}


export const postGenerateConfig_Week_Timetables = async (req: Request, res: Response) => {
  try {
    const {hour, minutes, hours,start_dayWeek, end_dayWeek} = req.body;

    if(!hour || !minutes ||!hours || !start_dayWeek || !end_dayWeek) {
        res.status(404).send('Are required');
    }
    const generateDays = generateDaysWeek(start_dayWeek, end_dayWeek);
    const generateHours = generatehours(hour, minutes, hours);

    await config_week_timetableModel.deleteMany().exec();

    const config_week_timetable = new config_week_timetableModel({
        hour,
        hours,
        minutes,
        generateHours,
        generateDays
    });
    await config_week_timetable.save();
    res.status(200).send("Config Created");
  } catch (error) {
    res.status(404).send(error);
  }
}
