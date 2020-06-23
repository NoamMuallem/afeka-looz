//basic imports
import React from "react";
import classes from "./not-found.module.scss";
//components
import BackButton from "../back-button/back-button.component";
//redux
import { connect } from "react-redux";
//reselect and selectors
import { createStructuredSelector } from "reselect";
import { selectNewCourseNumber } from "../../redux/courses/courses.selectors";

interface Props {
  courseNumber: string;
}

const NotFound: React.FC<Props> = ({ courseNumber }) => {
  return (
    <div className={classes.Error}>
      <span className={classes.ButtonContainer}>
        <BackButton />
      </span>
      <p> לא ניתן היה למצוא קורס עם הקוד {courseNumber}</p>
      <p>נא בדוק את מספר הקורס ונסה שוב</p>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  courseNumber: selectNewCourseNumber,
});

export default connect(mapStateToProps)(NotFound);
