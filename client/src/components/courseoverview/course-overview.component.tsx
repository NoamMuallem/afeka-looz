//refular imports
import React, { Component } from "react";
import classes from "./course-overview.module.scss";
//needed components
import CourseCollection from "./course-collection/course-collection.component";
import Filters from "../filters/filters.component";
import { Button } from "react-bootstrap";
import BackButton from "../back-button/back-button.component";
//interfaces
import { Course } from "../../utils/course-interface";
//redux
import { connect } from "react-redux";
import { updateCourse } from "../../redux/courses/courses.actions";
//reselect and selectors
import { createStructuredSelector } from "reselect";
import {
  selectMyCourses,
  selectNewCourse,
} from "../../redux/courses/courses.selectors";

interface CourseOverviewProps {
  //courses to see if allready exsists
  courses: Array<Course>;
  //this spesific course
  data: Course;
  //save the changes to that course in the state
  save: (course: Course) => void;
}

class CourseOverview extends Component<CourseOverviewProps> {
  //check if there is a change and display text on button accordingly
  //(diffrent if new course or change in exsisting course)
  saveButton = () => {
    //look for new course in myCourses
    const matchIndex = this.props.courses.findIndex(
      (course) => course.courseNumber === this.props.data.courseNumber
    );
    let text = null;
    if (matchIndex !== -1) {
      if (
        this.props.courses[matchIndex].filters[0] !==
          this.props.data.filters[0] ||
        this.props.courses[matchIndex].filters[1] !==
          this.props.data.filters[1] ||
        this.props.courses[matchIndex].filters[2] !== this.props.data.filters[2]
      ) {
        text = "שמור שינויים";
      }
    } else {
      text = "הוסף לקורסים שלי";
    }
    return text ? (
      <Button
        onClick={() => {
          this.props.save(this.props.data);
          this.forceUpdate();
        }}
        variant="outline-light"
      >
        {text}
      </Button>
    ) : null;
  };

  //lists the semester and the courses in them
  semesterLists = () => {
    //we checked if data is null and it is not!
    const { data, filters } = this.props.data;
    return (
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
    );
  };

  render() {
    const { data } = this.props.data;
    if (data) {
      return (
        <div>
          <span className={classes.Headline}>
            <span>{data!.name}</span>
            <BackButton />
          </span>
          <Filters />
          {this.saveButton()}
          {this.semesterLists()}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectNewCourse,
  courses: selectMyCourses,
});

const mapDispatchToProps = (dispatch: any) => ({
  save: (course: Course) => dispatch(updateCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverview);
