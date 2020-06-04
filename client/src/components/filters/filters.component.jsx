import React from "react";
import MyCheckbox from "../checkbox/checkbox.component";
import classes from "./filters.module.scss";

const Filters = ({ checked, course }) => {
  let a = course.a;
  let b = course.b;
  let c = course.c;
  let dispA = course.data.semesterA.length > 0;
  let dispB = course.data.semesterB.length > 0;
  let dispC = course.data.semesterC.length > 0;
  return (
    <div>
      <div className={classes.Filters}>
        <MyCheckbox
          str={"קיץ"}
          click={() => checked("c", course)}
          checked={c}
          disp={dispC}
        />
        <MyCheckbox
          str={"ב"}
          click={() => checked("b", course)}
          checked={b}
          disp={dispB}
        />
        <MyCheckbox
          str={"א"}
          click={() => checked("a", course)}
          checked={a}
          disp={dispA}
        />
      </div>
    </div>
  );
};

export default Filters;
