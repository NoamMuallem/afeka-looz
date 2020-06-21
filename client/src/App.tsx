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

class App extends Component<Props> {
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
