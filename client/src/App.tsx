//basic imports
import React, { Component } from "react";
import "./App.scss";
//router
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
//components and pages
import Header from "./components/header/header.component";
import AddCourse from "./components/add-course/add-course.component";
import MyCourses from "./components/my-courses/my-courses.cmponent";
import Spinner from "./components/spinner/spinner.component";
import CourseOverview from "./components/courseoverview/course-overview.component";
import NotFound from "./components/not-found/not-found.component";
import Homepage from "./components/home-page/home-page.component";

interface Props extends RouteComponentProps {}

// interface State {
//   myCourses: Array<Course>;
//   loading: boolean;
//   newCourse: {
//     courseNumber: string;
//     a: { [key: string]: boolean };
//     b: { [key: string]: boolean };
//     c: { [key: string]: boolean };
//     data: null | {
//       name: string;
//       semesterA: Array<Option>;
//       semesterB: Array<Option>;
//       semesterC: Array<Option>;
//     };
//   };
// }

class App extends Component<Props> {
  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     myCourses: [],
  //     loading: false,
  //     newCourse: {
  //       courseNumber: "",
  //       a: { a: true },
  //       b: { b: true },
  //       c: { c: true },
  //       data: null,
  //     },
  //   };
  // }

  // searchCourse = (courseNumber: string) => {
  //   //searching for an existing copy of the cours:
  //   let matchIndex = this.state.myCourses.findIndex((course) => {
  //     return course.courseNumber === courseNumber;
  //   });
  //   if (matchIndex !== -1) {
  //     this.setState({
  //       ...this.state,
  //       newCourse: { ...this.state.myCourses[matchIndex] },
  //     });
  //     this.props.history.push("/display");
  //   } else {
  //     this.setState({ loading: true }, () => {
  //       axios
  //         .get(`/courses/${courseNumber}`)
  //         .then((result: any) => {
  //           //if we got back an empty array the backend script didn't ran, try again
  //           if (
  //             result.data.length === 0 ||
  //             (result.data.semesterA.length === 0 &&
  //               result.data.semesterB.length === 0 &&
  //               result.data.semesterC.length === 0)
  //           ) {
  //             this.searchCourse(courseNumber);
  //           } else {
  //             let course = {
  //               courseNumber,
  //               a: { a: result.data.semesterA.length > 0 },
  //               b: { b: result.data.semesterB.length > 0 },
  //               c: { c: result.data.semesterC.length > 0 },
  //               data: result.data,
  //             };
  //             this.setState({ newCourse: course });

  //             this.setState({ loading: false });

  //             this.props.history.push("/display");
  //           }
  //         })
  //         .catch((error) => {
  //           this.setState({
  //             ...this.state,
  //             newCourse: { ...this.state.newCourse, courseNumber },
  //           });
  //           this.props.history.push("/error");
  //           this.setState({ loading: false });
  //         });
  //     });
  //   }
  // };

  // updateCourses = (updateCourse: Course) => {
  //   //takes newCourse or update flters on existing course
  //   //search for another course with that same course number
  //   let coppyMyCourses = this.state.myCourses;

  //   let matchIndex = coppyMyCourses.findIndex((course) => {
  //     return course.courseNumber === updateCourse.courseNumber;
  //   });

  //   //if not found add to state
  //   if (matchIndex === -1) {
  //     coppyMyCourses.push(updateCourse);
  //   } else {
  //     //if already in update the semester filter
  //     coppyMyCourses[matchIndex] = updateCourse;
  //   }
  //   this.setState({ myCourses: coppyMyCourses });
  // };

  // setNewCourse = (courseNumber: string) => {
  //   const matchIndex = this.state.myCourses.findIndex(
  //     (myCourse) => myCourse.courseNumber === courseNumber
  //   );
  //   this.setState({ newCourse: this.state.myCourses[matchIndex] });
  //   this.props.history.push("/display");
  // };

  // deleteCourse = (courseNum: string) => {
  //   const matchIndex = this.state.myCourses.findIndex((myCourse) => {
  //     return myCourse.courseNumber === courseNum;
  //   });
  //   let coppy = this.state.myCourses;
  //   coppy.splice(matchIndex, 1);
  //   this.setState({ myCourses: coppy });
  // };

  render() {
    return (
      <div className="App">
        <Header />
        <Spinner />
        <Route path="/" exact render={() => <Homepage />} />
        <Route path="/add" render={() => <AddCourse />} />
        <Route path="/myCourses" render={() => <MyCourses />} />
        <Route path="/display" render={() => <CourseOverview />} />
        <Route path="/error" render={() => <NotFound />} />
      </div>
    );
  }
}

export default withRouter(App);
