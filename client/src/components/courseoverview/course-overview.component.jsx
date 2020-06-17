import React, { Component } from "react";
import CourseCollection from "./course-collection/course-collection.component";
import classes from "./course-overview.module.scss";
import Filters from "../filters/filters.component";
import { Button } from "react-bootstrap";
import BackButton from "../back-button/back-button.component";

class CourseOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        courseNumber: this.props.data.courseNumber,
        a: this.props.data.a,
        b: this.props.data.b,
        c: this.props.data.c,
        data: {
          name: this.props.data.data.name,
          semesterA: this.props.data.data.semesterA,
          semesterB: this.props.data.data.semesterB,
          semesterC: this.props.data.data.semesterC,
        },
      },
    };
  }

  canSave = () => {
    //look for (new?) course in courses
    const matchIndex = this.props.courses.findIndex(
      (course) => course.courseNumber === this.state.course.courseNumber
    );
    if (matchIndex !== -1) {
      if (
        (this.props.courses[matchIndex].a !== this.state.course.a) |
        (this.props.courses[matchIndex].b !== this.state.course.b) |
        (this.props.courses[matchIndex].c !== this.state.course.c)
      ) {
        return "שמור שינויים";
      } else {
        return null;
      }
    } else {
      return "הוסף לקורסים שלי";
    }
  };

  checked = (semesterFilter) => {
    let coppy = this.state.course;
    coppy = { ...coppy, [semesterFilter]: !coppy[semesterFilter] };

    this.setState({ course: coppy });
  };

  render() {
    const dispSave = this.canSave();
    const { a, b, c, data } = this.state.course;

    return (
      <div>
        <span className={classes.Headline}>
          <span>{data.name}</span>
          <BackButton />
        </span>
        {dispSave ? (
          <Button
            onClick={() => this.props.save(this.state.course)}
            variant="outline-light"
          >
            {dispSave}
          </Button>
        ) : null}

        <div className={classes.FilterHeadline}>:סינון סמסטרים</div>
        <Filters course={this.state.course} checked={this.checked} />
        <div className={classes.List}>
          {(data.semesterA.length !== 0) & a ? (
            <CourseCollection str={"סמסטר א"} semester={data.semesterA} />
          ) : null}
          {(data.semesterB.length !== 0) & b ? (
            <CourseCollection str={"סמסטר ב"} semester={data.semesterB} />
          ) : null}
          {(data.semesterC.length !== 0) & c ? (
            <CourseCollection str={"סמסטר קיץ"} semester={data.semesterC} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CourseOverview;
