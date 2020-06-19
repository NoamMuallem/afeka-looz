import React from "react";
import classes from "./cart-course.module.scss";
import { Button } from "react-bootstrap";
import { Course } from "../../../utils/course-interface";

interface Props {
  course: Course;
  setNewCourse: () => void;
  deleteCourse: () => void;
}

const CartCourse: React.FC<Props> = ({
  course,
  setNewCourse,
  deleteCourse,
}) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Semesters}>
        <span>{course.a ? " א " : "   "}</span>
        <span>{course.b ? " ב " : "   "}</span>
        <span>{course.c ? "קיץ" : "   "}</span>
      </div>
      <div className={classes.Name}>{course.data!.name}</div>
      <div className={classes.Buttons}>
        <Button size="sm" variant="outline-light" onClick={setNewCourse}>
          ערוך
        </Button>
        <Button size="sm" onClick={deleteCourse} variant="outline-danger">
          מחק
        </Button>
      </div>
    </div>
  );
};

export default CartCourse;
