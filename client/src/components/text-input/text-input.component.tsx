import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { searchCourse } from "../../redux/courses/courses.actions";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Course } from "../../utils/course-interface";

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

const mapStateToProps = (state: any) => ({
  loading: state.courses.loading,
  courses: state.courses.myCourses,
});

const mapDispatchToProps = (dispatch: any, ownProps: Props) => ({
  click: (courseNumber: string, courses: Array<Course>) =>
    dispatch(searchCourse(courseNumber, courses, ownProps)),
});

//known issiu when using withRouter and connect together
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyTextInput)
) as any;
