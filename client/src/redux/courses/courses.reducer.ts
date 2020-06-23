import CoursesTypes from "./courses.types";
import { Course } from "../../utils/course-interface";

export interface State {
  myCourses: Array<Course>;
  loading: boolean;
  newCourse: Course;
}

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE = {
  myCourses: [],
  loading: false,
  newCourse: {
    courseNumber: "",
    filters: [true, true, true],
    data: null,
  },
};

const courseReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    ////////////////////ADD_NEW_COURSE
    case CoursesTypes.ADD_NEW_COURSE:
      return {
        ...state,
        newCourse: action.payload,
      };

    ////////////////////SET_NEW_COURS
    case CoursesTypes.SET_NEW_COURSE:
      let matchIndex = state.myCourses.findIndex(
        (myCourse) => myCourse.courseNumber === action.payload
      );
      return {
        ...state,
        newCourse: state.myCourses[matchIndex],
      };

    ///////////////////DELETE_COURS
    case CoursesTypes.DELETE_COURSE:
      let matchIndex2 = state.myCourses.findIndex((myCourse) => {
        return myCourse.courseNumber === action.payload;
      });
      let coppy = state.myCourses;
      coppy.splice(matchIndex2, 1);
      return {
        ...state,
        myCourses: coppy,
      };

    ////////////////UPDATE_COURSE
    case CoursesTypes.UPDATE_COURSE:
      //takes newCourse or update flters on existing course
      //search for another course with that same course number
      let coppyMyCourses = state.myCourses;
      let matchIndex1 = coppyMyCourses.findIndex(
        (course) => course.courseNumber === action.payload.courseNumber
      );
      //if not found add to state
      if (matchIndex1 === -1) {
        coppyMyCourses.push(action.payload);
      } else {
        //if already in update the semester filter
        coppyMyCourses[matchIndex1] = action.payload;
      }
      return {
        ...state,
        myCourses: coppyMyCourses,
      };

    ///////checkbox change
    case CoursesTypes.CHECKBOX_NEW_COURSE:
      let coppy1 = { ...state.newCourse };
      let filtersCoppy1 = [...coppy1.filters];
      filtersCoppy1[action.payload] = !filtersCoppy1[action.payload];

      coppy1 = {
        ...coppy1,
        filters: filtersCoppy1,
      };

      return {
        ...state,
        newCourse: coppy1,
      };

    ////////////////////SET_LOADING
    case CoursesTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    ////////////STOP_LOADING
    case CoursesTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default courseReducer;
