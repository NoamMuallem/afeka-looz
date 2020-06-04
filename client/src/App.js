//basic imports
import React, { Component } from "react";
import "./App.scss";
//router
import { Route, withRouter } from "react-router-dom";
//components and pages
import Header from "./components/header/header.component";
import AddCourse from "./components/add-course/add-course.component";
import MyCourses from "./components/my-courses/my-courses.cmponent";
import Spinner from "./components/spinner/spinner.component";
import CourseOverview from "./components/courseoverview/course-overview.component";
import NotFound from "./components/not-found/not-found.component";
import Homepage from "./components/home-page/home-page.component";
//funcionality
import axios from "axios";
//excel utils
import { courseToJson } from "./utils/json-data";
import { excelBuilder } from "./utils/excel-builder";

//todo
//change logo and title of app
//animation

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: [],
      loading: false,
      newCourse: {
        courseNumber: "",
        a: true,
        b: true,
        c: true,
        data: null,
      },
    };
  }

  canSave = () => {
    //look for new course in myCourses
    const matchIndex = this.state.myCourses.findIndex(
      (course) => course.courseNumber === this.state.newCourse.courseNumber
    );
    if (matchIndex !== -1) {
      if (
        (this.state.myCourses[matchIndex].a !== this.state.newCourse.a) |
        (this.state.myCourses[matchIndex].b !== this.state.newCourse.b) |
        (this.state.myCourses[matchIndex].c !== this.state.newCourse.c)
      ) {
        return "שמור שינויים";
      } else {
        return null;
      }
    } else {
      return "הוסף לקורסים שלי";
    }
  };

  createExcelFile = () => {
    excelBuilder(courseToJson(this.state.myCourses));
  };

  searchCourse = (courseNumber) => {
    //searching for an existing copy of the cours:
    let matchIndex = this.state.myCourses.findIndex((course) => {
      return course.courseNumber === courseNumber;
    });
    if (matchIndex !== -1) {
      this.setState({ newCourse: this.state.myCourses[matchIndex] });
      this.props.history.push("/display");
    } else {
      this.setState({ loading: true }, () => {
        axios
          .get(`/courses/${courseNumber}`)
          .then((result) => {
            //if we got back an empty array the backend script didn't ran, try again
            if (
              (result.data.length === 0) |
              ((result.data.semesterA.length === 0) &
                (result.data.semesterB.length === 0) &
                (result.data.semesterC.length === 0))
            ) {
              this.searchCourse(courseNumber);
            } else {
              let course = {
                courseNumber,
                a: result.data.semesterA.length > 0,
                b: result.data.semesterB.length > 0,
                c: result.data.semesterC.length > 0,
                data: result.data,
              };
              this.setState({ newCourse: course });

              this.setState({ loading: false });

              this.props.history.push("/display");
            }
          })
          .catch((error) => {
            this.setState({
              ...this.state,
              newCourse: { ...this.state.newCourse, courseNumber },
            });
            this.props.history.push("/error");
            this.setState({ loading: false });
          });
      });
    }
  };

  checked = (semesterFilter, inputCourse) => {
    //get a copy of the original courses
    let courses = this.state.myCourses;
    //find index of course
    let matchIndex = courses.findIndex((course) => {
      return course.courseNumber === inputCourse.courseNumber;
    });
    if (matchIndex !== -1) {
      //look for the corresponding course
      let course = courses[matchIndex];
      this.setState({ newCourse: course });
    }
    let coppy = this.state.newCourse;
    coppy = { ...coppy, [semesterFilter]: !coppy[semesterFilter] };

    this.setState({ newCourse: coppy });
  };

  updateCourses = (updateCourse) => {
    //takes newCourse or update flters on existing course
    //search for another course with that same course number
    let coppyMyCourses = this.state.myCourses;

    let matchIndex = coppyMyCourses.findIndex((course) => {
      return course.courseNumber === updateCourse.courseNumber;
    });

    //if not found add to state
    if (matchIndex === -1) {
      coppyMyCourses.push(updateCourse);
    } else {
      //if already in update the semester filter
      coppyMyCourses[matchIndex] = updateCourse;
    }
    this.setState({ myCourses: coppyMyCourses });
  };

  changeNewCourse = (courseNumber) => {
    const matchIndex = this.state.myCourses.findIndex(
      (myCourse) => myCourse.courseNumber === courseNumber
    );
    this.setState({ newCourse: this.state.myCourses[matchIndex] });
    this.props.history.push("/display");
  };

  deleteCourse = (courseNum) => {
    const matchIndex = this.state.myCourses.findIndex((myCourse) => {
      return myCourse.courseNumber === courseNum;
    });
    let coppy = this.state.myCourses;
    coppy.splice(matchIndex, 1);
    this.setState({ myCourses: coppy });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Spinner loading={this.state.loading} />
        <Route path="/" exact render={Homepage} />
        <Route
          path="/add"
          render={() => (
            <AddCourse
              searchCourse={this.searchCourse}
              checked={this.checked}
              save={this.updateCourses}
              newCourse={this.state.newCourse}
              loading={this.state.loading}
            />
          )}
        />
        <Route
          path="/myCourses"
          render={() => (
            <MyCourses
              checked={this.checked}
              courses={this.state.myCourses}
              changeNewCourse={this.changeNewCourse}
              deleteCourse={this.deleteCourse}
              excel={this.createExcelFile}
            />
          )}
        />
        <Route
          path="/display"
          render={() => (
            <CourseOverview
              data={this.state.newCourse}
              save={this.updateCourses}
              checked={this.checked}
              canSave={this.canSave}
            />
          )}
        />
        <Route
          path="/error"
          render={() => (
            <NotFound courseNumber={this.state.newCourse.courseNumber} />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
