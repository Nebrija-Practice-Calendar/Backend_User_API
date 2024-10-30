import { Router } from "express";
import { postCourse } from "./resolvers/Post/Course/postCourse.ts";
import { postCourse_and_Group } from "./resolvers/Post/Course_Group/postCourse_and_Group.ts";
import { postPeriod } from "./resolvers/Post/Period/postPeriod.ts";
import { postSubject } from "./resolvers/Post/Subject/postSubject.ts";
import { postGenerateConfig_Week_Timetables } from "./resolvers/Post/Config/postGenerateConfig_Week_Timetables.ts";
import { postCreateSubjects_Timetables } from "./resolvers/Post/Subject_Timetable/postCreateSubjects_Timetables.ts";
import { postCreatePractices_Timetables } from "./resolvers/Post/Pratice_Timetable/postCreatePractices_Timetables.ts";
import { postException } from "./resolvers/Post/Exception/postException.ts";
import { postDegree } from "./resolvers/Post/Degree/postDegree.ts";
import { postSemester } from "./resolvers/Post/Semester/postSemester.ts";
import { postClassroom } from "./resolvers/Post/Classroom/postClassroom.ts";
import { postPractice } from "./resolvers/Post/Practice/postPractice.ts";
import { getDaysCalendar } from "./resolvers/Get/Config/getDaysCalendar.ts";
import { getPeriodsID_semester } from "./resolvers/Get/Period/getPeriodsID_semester.ts";
import { getPeriods } from "./resolvers/Get/Period/getPeriods.ts";
import { getPractices } from "./resolvers/Get/Practice/getPractices.ts";
import { getSubjects } from "./resolvers/Get/Subject/getSubjects.ts";
import { getSubject_Timetable } from "./resolvers/Get/Subject_Timetable/getSubject_Timetable.ts";
import { getSubjects_Timetables } from "./resolvers/Get/Subject_Timetable/getSubjects_Timetables.ts";
import { getCourses } from "./resolvers/Get/Course/getCourses.ts";
import { getCourse } from  "./resolvers/Get/Course/getCourse.ts";
import { getCourseId_group } from "./resolvers/Get/Course/getCourseId_group.ts";
import { getSemesters } from "./resolvers/Get/Semester/getSemesters.ts";
import { getDegrees } from "./resolvers/Get/Degree/getDegrees.ts";
import { getClassrooms } from "./resolvers/Get/Classroom/getClassrooms.ts";
import { getExceptions } from "./resolvers/Get/Exception/getExceptions.ts";
import { getExceptionsID_period } from "./resolvers/Get/Exception/getExceptionsID_period.ts";
import { getSubjects_CourseID } from "./resolvers/Get/Subject/getSubjects_CourseID.ts";
import { getSubjects_CourseIDs } from "./resolvers/Get/Subject/getSubjects_CourseIDs.ts";
import { getCourses_Courses_and_GroupsID } from "./resolvers/Get/Course_Group/getCourses_Courses_and_GroupsID.ts";
import { getCourses_Courses_and_GroupsIDs } from "./resolvers/Get/Course_Group/getCourses_Courses_and_GroupsIDs.ts";
import { getCourses_Courses_and_GroupsID_period } from "./resolvers/Get/Course_Group/getCourses_Courses_and_GroupsID_period.ts";
import { getExcelPracticeCalendar } from "./resolvers/Get/Downloads/getExcelPracticeCalendar.ts";
import { getCourses_and_Groups } from "./resolvers/Get/Course_Group/getCourses_and_Groups.ts";
import { getSubjects_TimetablesWTimetables } from "./resolvers/Get/Subject_Timetable/getSubjects_TimetablesWTimetables.ts";
import { getPractice_TimetableID_classroom } from "./resolvers/Get/Pratice_Timetable/getPractice_TimetableID_classroom.ts";
import { getClassroomID } from "./resolvers/Get/Classroom/getClassroomID.ts";
import { getConfig_Week_Timetable } from "./resolvers/Get/Config/getConfig_Week_Timetable.ts";
import { getAvailableHours } from "./resolvers/Get/Pratice_Timetable/getAvailableHours.ts";
import { getCalendarHours } from "./resolvers/Get/Pratice_Timetable/getCalendarHours.ts";
import { putSubjects_Timetables } from "./resolvers/Put/Subject_Timetable/putSubjects_Timetables.ts";
import { putPractices_Timetables } from "./resolvers/Put/Pratice_Timetable/putPractices_Timetables.ts";
import { putCourse } from "./resolvers/Put/Course/putCourse.ts";
import { putClassroomDetails } from "./resolvers/Put/Classroom/putClassroomDetails.ts";
import { deleteClassroomID } from "./resolvers/Delete/Classroom/deleteClassroomID.ts";
import { deletePeriodID } from "./resolvers/Delete/Period/deletePeriodID.ts";
import { deleteSubjectID } from "./resolvers/Delete/Subject/deleteSubjectID.ts";
import { deleteCourse_and_GroupID } from "./resolvers/Delete/Course_Group/deleteCourse_and_GroupID.ts";
import { deleteSubjectsTimetableID } from "./resolvers/Delete/Subject_Timetable/deleteSubjectsTimetableID.ts";
import { deleteSubject_Subjects_Timetable } from "./resolvers/Delete/Subject_Timetable/deleteSubject_Subjects_Timetable.ts";
import { deletePracticeTimetableID } from "./resolvers/Delete/Pratice_Timetable/deletePracticeTimetableID.ts";
import { deletePractice_Practice_Timetable } from "./resolvers/Delete/Pratice_Timetable/deletePractice_Practice_Timetable.ts";
import { deleteCourseID } from "./resolvers/Delete/Course/deleteCourseID.ts";
import { deleteSemesterID } from "./resolvers/Delete/Semester/deleteSemesterID.ts";
import { deleteDegreeID } from "./resolvers/Delete/Degree/deleteDegreeID.ts";
import { deleteCourseElementID } from "./resolvers/Delete/Course/deleteCourseElementID.ts";
import { deleteExceptionID } from "./resolvers/Delete/Exception/deleteExceptionID.ts";


export const router = new Router();

router
    .get("/getPeriods", getPeriods)
    .get("/getPeriodsID_semester", getPeriodsID_semester)
    .get("/getDaysCalendar", getDaysCalendar)
    .get("/getConfig_Week_Timetable", getConfig_Week_Timetable)
    .get("/getClassrooms", getClassrooms)
    .get("/getSubjects", getSubjects)
    .get("/getSubjects_CourseID", getSubjects_CourseID)
    .get("/getSubjects_CourseIDs", getSubjects_CourseIDs)
    .get("/getCourses", getCourses)
    .get("/getCourse", getCourse)
    .get("/getSemesters", getSemesters)
    .get("/getDegrees", getDegrees)
    .get("/getExceptions", getExceptions)
    .get("/getExceptionsID_period", getExceptionsID_period)
    .get("/getPractices", getPractices)
    .get("/getCourses_and_Groups", getCourses_and_Groups)
    .get("/getCourseId_group", getCourseId_group)
    .get("/getCourses_Courses_and_GroupsID", getCourses_Courses_and_GroupsID)
    .get("/getCourses_Courses_and_GroupsIDs", getCourses_Courses_and_GroupsIDs)
    .get("/getCourses_Courses_and_GroupsID_period", getCourses_Courses_and_GroupsID_period)
    .get("/getExcelPracticeCalendar", getExcelPracticeCalendar)
    .get("/getSubject_Timetable", getSubject_Timetable)
    .get("/getPractice_TimetableID_classroom", getPractice_TimetableID_classroom)
    .get("/getSubjects_Timetables", getSubjects_Timetables)
    .get("/getSubjects_TimetablesWTimetables", getSubjects_TimetablesWTimetables)
    .get("/getAvailableHours", getAvailableHours)
    .get("/getCalendarHours", getCalendarHours)
    .get("/getClassroomID", getClassroomID)
    .post("/postPractice", postPractice)
    .post("/postSubject", postSubject)
    .post("/postPeriod", postPeriod)
    .post("/postCourse", postCourse)
    .post("/postDegree", postDegree)
    .post("/postSemester", postSemester)
    .post("/postClassroom", postClassroom)
    .post("/postCourse_and_Group", postCourse_and_Group)
    .post("/postGenerateConfig_Week_Timetables", postGenerateConfig_Week_Timetables)
    .post("/postCreateSubjects_Timetables", postCreateSubjects_Timetables)
    .post("/postCreatePractices_Timetables", postCreatePractices_Timetables)
    .post("/postException", postException)
    .put("/putPractices_Timetables", putPractices_Timetables)
    .put("/putSubjects_Timetable", putSubjects_Timetables)
    .put("/putCourse", putCourse)
    .put("/putClassroomDetails", putClassroomDetails)
    .delete("/deleteClassroomID", deleteClassroomID)
    .delete("/deletePeriodID", deletePeriodID)
    .delete("/deleteSubjectID", deleteSubjectID)
    .delete("/deleteCourse_and_GroupID", deleteCourse_and_GroupID)
    .delete("/deleteSubjectsTimetableID", deleteSubjectsTimetableID)
    .delete("/deletePracticeTimetableID", deletePracticeTimetableID)
    .delete("/deleteSubject_Subjects_Timetable", deleteSubject_Subjects_Timetable)
    .delete("/deletePractice_Practice_Timetable", deletePractice_Practice_Timetable)
    .delete("/deleteCourseID", deleteCourseID)
    .delete("/deleteCourseElementID", deleteCourseElementID)
    .delete("/deleteSemesterID", deleteSemesterID)
    .delete("/deleteDegreeID", deleteDegreeID)
    .delete("/deleteExceptionID", deleteExceptionID);

