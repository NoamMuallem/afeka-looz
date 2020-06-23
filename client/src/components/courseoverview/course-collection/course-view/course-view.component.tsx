//basic imports
import React from "react";
import classes from "./course-view.module.scss";
//interfaces
import { Option, Lecture } from "../../../../utils/course-interface";

interface Props {
  option: Option;
}

const CourseView: React.FC<Props> = ({ option }) => {
  let count = 0;

  const fyi = (event: Lecture) => {
    return event.fyi ? (
      <span style={{ color: "red" }} className={classes.Warning}>
        {event.fyi}
      </span>
    ) : null;
  };

  const left = (event: Lecture) => (
    <div className={event.parts.length === 1 ? classes.Left : classes.LeftTop}>
      <span>{event.parts[0].classRoom}</span>
      <span>{event.parts[0].ends}</span>
      <span>{event.parts[0].start}</span>
      <span>{event.parts[0].day}</span>
    </div>
  );

  const leftBottom = (event: Lecture) => (
    <div className={classes.LeftBottom}>
      <span>{event.parts[1].classRoom}</span>
      <span>{event.parts[1].ends}</span>
      <span>{event.parts[1].start}</span>
      <span>{event.parts[1].day}</span>
    </div>
  );

  const right = (event: Lecture) => (
    <div className={classes.Right}>
      <span>{event.lecturer}</span>
      <div>
        <span>{event.groupId}</span>
      </div>
      <span> {event.lectureType} </span>
    </div>
  );

  return (
    <>
      {option.map((event) => {
        return (
          <div key={event.groupId}>
            {fyi(event)}
            <div className={classes.Container}>
              {left(event)}
              {event.parts.length === 1 ? null : leftBottom(event)}
              {right(event)}
              {++count <= option.length - 1 ? (
                <span className={classes.Breaker} />
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CourseView;
