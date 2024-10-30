export type Subjects_Timetables={
    id:string,
    id_period:string,
    id_course:string,
    //id_degree:string,
    Timetables:string[][]
}
export type Subject={
    id:string,
    name:string,
    //id_degree:string,
    id_semester:string,
    id_course:string,
    code:string,
    colour:string
}
export type Practices_Timetables={
    id:string,
    id_period:string,
    id_classroom:string,
    Timetables:[{
        id:number,
        Week_Timetable:(string|string[])[][]
    }]
}
export type Courses_and_Groups={
    id:string,
    //id_degree:string,
    name:string
}
export type Period={
    id:string,
    name:string,
    id_semester:string,
    start_date:Date,
    end_date:Date,
}

export type Course={
    id:string,
    name:string,
    //id_degree:string,
    id_course_and_group:string[]
}

export type Semester={
    id:string,
    name:string
}

export type Exception={
    id:string,
    name:string,
    id_period:string,
    start_date:Date,
    end_date:Date,
}

export type Practice= {
    id:string,
    name:string,
    students:number,
    computers:boolean,
    observation:string,
    id_course_and_group:string,
    id_period:string,
    id_subject:string,
}

export type Classroom={
    id:string,
    name:string,
    capacity:number,
    computers:boolean
}

export type Degree = {
    id:string,
    name:string
}

export type Config_Week_Timetable={
    id:string,
    hour:string,
    hours:number,
    minutes:number,
    generateHours:string[],
    generateDays:string[],
}

/*
export type TeacherType={
    id:string,
    Full_name:string,
    email:string,
    ids_subjects:[{
        id_subject:string,
        id_course_and_group:string
        necesities:string
    }]
}
*/


export type ErrorType={
    status:number,
    message:string
    json:JSON
}

