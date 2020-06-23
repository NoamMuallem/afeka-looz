import CoursesTypes from "./courses.types";
import { Course } from "../../utils/course-interface";
import axios from "axios";

export const updateCourse = (course: Course) => ({
  type: CoursesTypes.UPDATE_COURSE,
  payload: course,
});

export const setNewCourse = (courseNumber: string) => ({
  type: CoursesTypes.SET_NEW_COURSE,
  payload: courseNumber,
});

export const deleteCourse = (courseNumber: string) => ({
  type: CoursesTypes.DELETE_COURSE,
  payload: courseNumber,
});

export const setLoading = () => ({
  type: CoursesTypes.SET_LOADING,
});

export const stopLoading = () => ({
  type: CoursesTypes.STOP_LOADING,
});

export const addNewCourse = (course: Course) => ({
  type: CoursesTypes.ADD_NEW_COURSE,
  payload: course,
});

export const checkboxNewCourse = (semesterFilter: number) => ({
  type: CoursesTypes.CHECKBOX_NEW_COURSE,
  payload: semesterFilter,
});

export const searchCourse = (
  courseNumber: string,
  courses: Array<Course>,
  props: any
) => {
  return (dispatch: any) => {
    let matchIndex = courses.findIndex(
      (course) => course.courseNumber === courseNumber
    );
    if (matchIndex !== -1) {
      dispatch(setNewCourse(courseNumber));
      props.history.push("/display");
    } else {
      dispatch(setLoading());
      axios
        .get(`/courses/${courseNumber}`)
        .then((result: any) => {
          //if we got back an empty array , try again
          if (
            result.data.length === 0 ||
            (result.data.semesterA.length === 0 &&
              result.data.semesterB.length === 0 &&
              result.data.semesterC.length === 0)
          ) {
            dispatch(searchCourse(courseNumber, courses, props));
          } else {
            let course = {
              courseNumber,
              filters: [
                result.data.semesterA.length > 0,
                result.data.semesterB.length > 0,
                result.data.semesterC.length > 0,
              ],
              data: result.data,
            };
            dispatch(addNewCourse(course));
            dispatch(stopLoading());
            //redirect to display
            props.history.push("/display");
          }
        })
        .catch((error) => {
          let course = {
            courseNumber,
            filters: [false, false, false],
            data: null,
          };
          dispatch(addNewCourse(course));
          dispatch(stopLoading());
          //redirect to error
          props.history.push("/error");
        });
    }
  };
};
