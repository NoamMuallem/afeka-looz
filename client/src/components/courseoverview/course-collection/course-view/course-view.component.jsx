import React from "react";
import classes from "./course-view.module.scss";

const CourseView = ({ option }) => {
  let count = 0;
  return option.map((event) => {
    return (
      <div key={event.groupId}>
        {event.fyi ? (
          <span style={{ color: "red" }} className={classes.Warning}>
            {event.fyi}
          </span>
        ) : null}
        <div className={classes.Container}>
          {event.parts.length === 1 ? null : (
            <div className={classes.LeftBottom}>
              <span>{event.parts[1].classRoom}</span>
              <span>{event.parts[1].ends}</span>
              <span>{event.parts[1].start}</span>
              <span>{event.parts[1].day}</span>
            </div>
          )}
          <div
            className={
              event.parts.length === 1 ? classes.Left : classes.LeftTop
            }
          >
            <span>{event.parts[0].classRoom}</span>
            <span>{event.parts[0].ends}</span>
            <span>{event.parts[0].start}</span>
            <span>{event.parts[0].day}</span>
          </div>
          <div className={classes.Right}>
            <span>{event.lecturer}</span>
            <div>
              <span>{event.groupId}</span>
              {}
            </div>

            <span> {event.lectureType} </span>
          </div>
          {++count <= option.length - 1 ? (
            <span className={classes.Breaker} />
          ) : null}
        </div>
      </div>
    );
  });
};

export default CourseView;
