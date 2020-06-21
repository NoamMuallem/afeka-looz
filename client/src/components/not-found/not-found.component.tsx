import React from "react";
import classes from "./not-found.module.scss";
import BackButton from "../back-button/back-button.component";
import { connect } from "react-redux";

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

const mapStateToProps = (state: any) => ({
  courseNumber: state.courses.newCourse.courseNumber,
});

export default connect(mapStateToProps)(NotFound);
