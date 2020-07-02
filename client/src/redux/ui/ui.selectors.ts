import { createSelector } from "reselect";
import { State } from "./ui.reducer";

const selectCourses = (state: any) => state.ui;

export const selectLoading = createSelector(
  [selectCourses],
  (courses: State) => courses.loading
);
