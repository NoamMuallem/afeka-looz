import React from "react";
import classes from "./cart-course.module.scss";
import { Button } from "react-bootstrap";
import { Course } from "../../../utils/course-interface";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { setNewCourse } from "../../../redux/courses/courses.actions";

interface Props extends RouteComponentProps {
  course: Course;
  delete: () => void;
  setCourse: (courseNumber: string) => void;
}

const CartCourse: React.FC<Props> = (props: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Semesters}>
        <span>{props.course.filters[0] ? " א " : "   "}</span>
        <span>{props.course.filters[1] ? " ב " : "   "}</span>
        <span>{props.course.filters[2] ? "קיץ" : "   "}</span>
      </div>
      <div className={classes.Name}>{props.course.data!.name}</div>
      <div className={classes.Buttons}>
        <Button
          size="sm"
          variant="outline-light"
          onClick={() => {
            props.setCourse(props.course.courseNumber);
            props.history.push("/display");
          }}
        >
          ערוך
        </Button>
        <Button size="sm" onClick={props.delete} variant="outline-danger">
          מחק
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCourse: (courseNumber: string) => dispatch(setNewCourse(courseNumber)),
});

export default withRouter(connect(null, mapDispatchToProps)(CartCourse)) as any;
