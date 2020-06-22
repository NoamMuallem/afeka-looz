import React, { Component } from "react";
import CourseCollection from "./course-collection/course-collection.component";
import classes from "./course-overview.module.scss";
import Filters from "../filters/filters.component";
import { Button } from "react-bootstrap";
import BackButton from "../back-button/back-button.component";
import { Course } from "../../utils/course-interface";
import { connect } from "react-redux";
import {
  updateCourse,
  checkboxNewCourse,
} from "../../redux/courses/courses.actions";

interface CourseOverviewProps {
  //courses to see if allready exsists
  courses: Array<Course>;
  //this spesific course
  data: Course;
  //save the changes to that course in the state
  save: (course: Course) => void;
  //for checkbox handling
  checkbox: (fiter: number, course: Course) => void;
}

class CourseOverview extends Component<CourseOverviewProps> {
  saveButton = () => {
    //look for new course in myCourses
    const matchIndex = this.props.courses.findIndex(
      (course) => course.courseNumber === this.props.data.courseNumber
    );
    if (matchIndex !== -1) {
      if (
        this.props.courses[matchIndex].filters[0] !==
          this.props.data.filters[0] ||
        this.props.courses[matchIndex].filters[1] !==
          this.props.data.filters[1] ||
        this.props.courses[matchIndex].filters[2] !== this.props.data.filters[2]
      ) {
        return "שמור שינויים";
      } else {
        return null;
      }
    } else {
      return "הוסף לקורסים שלי";
    }
  };

  checkboxHandler = (filter: number, course: Course) => {
    this.props.checkbox(filter, course);
    this.forceUpdate();
  };

  render() {
    const canSave = this.saveButton();
    const { data, filters } = this.props.data;
    if (data) {
      return (
        <div>
          <span className={classes.Headline}>
            <span>{data!.name}</span>
            <BackButton />
          </span>
          <div className={classes.FilterHeadline}>:סינון סמסטרים</div>
          <Filters checked={this.checkboxHandler} />
          {canSave ? (
            <Button
              onClick={() => {
                this.props.save(this.props.data);
                this.forceUpdate();
              }}
              variant="outline-light"
            >
              {canSave}
            </Button>
          ) : null}
          <div className={classes.List}>
            {data!.semesterA.length !== 0 && filters[0] ? (
              <CourseCollection str={"סמסטר א"} semester={data!.semesterA} />
            ) : null}
            {data!.semesterB.length !== 0 && filters[1] ? (
              <CourseCollection str={"סמסטר ב"} semester={data!.semesterB} />
            ) : null}
            {data!.semesterC.length !== 0 && filters[2] ? (
              <CourseCollection str={"סמסטר קיץ"} semester={data!.semesterC} />
            ) : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: any) => ({
  data: state.courses.newCourse,
  courses: state.courses.myCourses,
});

const mapDispatchToProps = (dispatch: any) => ({
  save: (course: Course) => dispatch(updateCourse(course)),
  checkbox: (filter: number) => dispatch(checkboxNewCourse(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverview);
