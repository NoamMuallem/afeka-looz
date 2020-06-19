import React from "react";
import MyCheckbox from "../checkbox/checkbox.component";
import classes from "./filters.module.scss";
import { Course } from "../../utils/course-interface";

interface Props {
  checked: (semester: string, curse: Course) => void;
  course: Course;
}

const Filters: React.FC<Props> = ({ checked, course }) => {
  //this component gets rendered ony if data is not null
  let a = Boolean(course.a);
  let b = Boolean(course.b);
  let c = Boolean(course.c);
  let dispA = course.data!.semesterA.length > 0;
  let dispB = course.data!.semesterB.length > 0;
  let dispC = course.data!.semesterC.length > 0;
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
