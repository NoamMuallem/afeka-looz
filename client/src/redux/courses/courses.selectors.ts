import { createSelector } from "reselect";
import { State } from "./courses.reducer";

const selectCourses = (state: any) => state.courses;

export const selectMyCourses = createSelector(
  [selectCourses],
  (courses: State) => courses.myCourses
);

export const selectNewCourse = createSelector(
  [selectCourses],
  (courses: State) => courses.newCourse
);

export const selectLoading = createSelector(
  [selectCourses],
  (courses: State) => courses.loading
);

export const selectNewCourseNumber = createSelector(
  [selectCourses],
  (courses: State) => courses.newCourse.courseNumber
);
