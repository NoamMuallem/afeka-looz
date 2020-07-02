//basic imports
import React from "react";
//components
import { InputGroup, FormControl, Button } from "react-bootstrap";
//redux and actions
import { connect } from "react-redux";
import { searchCourse } from "../../redux/courses/courses.actions";
//router
import { RouteComponentProps, withRouter } from "react-router-dom";
//interfaces
import { Course } from "../../utils/course-interface";
//reselect and selectors
import { createStructuredSelector } from "reselect";
import { selectMyCourses } from "../../redux/courses/courses.selectors";
import { selectLoading } from "../../redux/ui/ui.selectors";

interface Props extends RouteComponentProps {
  click: (number: string, courses: Array<Course>, ownProps: Props) => void;
  courses: Array<Course>;
  loading: boolean;
}

const MyTextInput: React.FC<Props> = (props: Props) => {
  let number = "";
  return (
    <InputGroup
      size="sm"
      style={{ width: "250px", margin: "40px auto", padding: "auto auto" }}
    >
      <FormControl
        onChange={(e) => (number = e.target.value)}
        aria-describedby="basic-addon1"
      />
      <InputGroup.Prepend>
        {!props.loading ? (
          <Button
            onClick={() => props.click(number, props.courses, props)}
            variant="outline-light"
          >
            חיפוש
          </Button>
        ) : (
          <Button disabled variant="outline-light">
            חיפוש
          </Button>
        )}
      </InputGroup.Prepend>
    </InputGroup>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  courses: selectMyCourses,
});

const mapDispatchToProps = (dispatch: any, ownProps: Props) => ({
  click: (courseNumber: string, courses: Array<Course>) =>
    dispatch(searchCourse(courseNumber, courses, ownProps)),
});

//known issiu when using withRouter and connect together
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyTextInput)
) as any;
