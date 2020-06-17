import React from "react";
import classes from "./cart-course.module.scss";
import { Button } from "react-bootstrap";

const CartCourse = ({ course, setNewCourse, deleteCourse }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Semesters}>
        <span>{course.a ? " א " : "   "}</span>
        <span>{course.b ? " ב " : "   "}</span>
        <span>{course.c ? "קיץ" : "   "}</span>
      </div>
      <div className={classes.Name}>{course.data.name}</div>
      <div className={classes.Buttons}>
        <Button
          size="sm"
          variant="outline-light"
          onClick={() => {
            setNewCourse(course.courseNumber);
          }}
        >
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
