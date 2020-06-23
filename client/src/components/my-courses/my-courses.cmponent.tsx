//basic imports
import React from "react";
import classes from "./my-courses.module.scss";
//components
import CartCourse from "./cart-curse/cart-course.component";
import { Button } from "react-bootstrap";
//excel utils
import { courseToJson } from "../../utils/json-data";
import { excelBuilder } from "../../utils/excel-builder";
//interfaces
import { Course } from "../../utils/course-interface";
//redux and actions
import { connect } from "react-redux";
import { deleteCourse } from "../../redux/courses/courses.actions";
//reselect and selectors
import { createStructuredSelector } from "reselect";
import { selectMyCourses } from "../../redux/courses/courses.selectors";

export interface MyCoursesProps {
  courses: Array<Course>;
  delete: (courseNumber: string) => void;
}

class MyCourses extends React.Component<MyCoursesProps> {
  createExcelFile = () => {
    excelBuilder(courseToJson(this.props.courses));
  };

  deleteAndRefrash = (courseNumber: string) => {
    this.props.delete(courseNumber);
    this.forceUpdate();
  };

  render() {
    return (
      <div className={classes.Container}>
        {this.props.courses.length === 0 ? (
          <span>לא נבחרו קורסים</span>
        ) : (
          <Button
            style={{ maxWidth: "90px", marginBottom: "16px" }}
            size="lg"
            onClick={() => this.createExcelFile()}
            variant="success"
          >
            הורדה
          </Button>
        )}
        <div className={classes.CourseList}>
          {this.props.courses.map((course) => (
            <CartCourse
              key={course.courseNumber}
              course={course}
              delete={() => this.deleteAndRefrash(course.courseNumber)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  courses: selectMyCourses,
});

const mapDispatchToProps = (dispatch: any) => ({
  delete: (courseNumber: string) => dispatch(deleteCourse(courseNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
