import React from "react";
import CourseView from "./course-view/course-view.component";
import classes from "./course-collection.module.scss";

const CourseCollection = ({ str, semester }) => {
  return (
    <>
      <div className={classes.HeadlineContainer}>
        <div className={classes.Headline}>{str}</div>
      </div>
      <div className={classes.Headers}>
        <div className={classes.HeadersLeft}>
          <span>חדר</span>
          <span>סיום</span>
          <span>התחלה</span>
          <span>יום</span>
        </div>
        <div className={classes.HeadersRight}>
          <span>מרצה</span>
          <span>מס' קבוצה</span>
          <span>סוג</span>
        </div>
      </div>
      {semester.map((option) => {
        return (
          <div className={classes.Course} key={option[0].groupId}>
            <CourseView option={option} />
          </div>
        );
      })}
    </>
  );
};

export default CourseCollection;
