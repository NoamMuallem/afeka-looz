import React from "react";
import CourseCollection from "./course-collection/course-collection.component";
import classes from "./course-overview.module.scss";
import Filters from "../filters/filters.component";
import { Button } from "react-bootstrap";
import BackButton from "../back-button/back-button.component";

const CourseOverview = ({ data, save, checked, canSave }) => {
  const dispSave = canSave();

  return data.data ? (
    <div>
      <span className={classes.Headline}>
        <span>{data.data.name}</span>
        <BackButton />
      </span>
      {dispSave ? (
        <Button onClick={() => save(data)} variant="outline-light">
          {dispSave}
        </Button>
      ) : null}

      <div className={classes.FilterHeadline}>:סינון סמסטרים</div>
      <Filters course={data} checked={checked} />
      <div className={classes.List}>
        {(data.data.semesterA.length !== 0) & data.a ? (
          <CourseCollection str={"סמסטר א"} semester={data.data.semesterA} />
        ) : null}
        {(data.data.semesterB.length !== 0) & data.b ? (
          <CourseCollection str={"סמסטר ב"} semester={data.data.semesterB} />
        ) : null}
        {(data.data.semesterC.length !== 0) & data.c ? (
          <CourseCollection str={"סמסטר קיץ"} semester={data.data.semesterC} />
        ) : null}
      </div>
    </div>
  ) : null;
};

export default CourseOverview;
