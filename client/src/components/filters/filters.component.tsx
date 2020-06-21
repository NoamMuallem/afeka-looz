import React from "react";
import MyCheckbox from "../checkbox/checkbox.component";
import classes from "./filters.module.scss";
import { Course } from "../../utils/course-interface";
import { connect } from "react-redux";

interface Props {
  checked: (semester: number, curse: Course) => void;
  course: Course;
}

const Filters: React.FC<Props> = ({ checked, course }) => {
  //this component gets rendered ony if data is not null
  let a = course.filters[0];
  let b = course.filters[1];
  let c = course.filters[2];
  let dispA = course.data!.semesterA.length > 0;
  let dispB = course.data!.semesterB.length > 0;
  let dispC = course.data!.semesterC.length > 0;
  return (
    <div>
      <div className={classes.Filters}>
        <MyCheckbox
          str={"קיץ"}
          click={() => checked(2, course)}
          checked={c}
          disp={dispC}
        />
        <MyCheckbox
          str={"ב"}
          click={() => checked(1, course)}
          checked={b}
          disp={dispB}
        />
        <MyCheckbox
          str={"א"}
          click={() => checked(0, course)}
          checked={a}
          disp={dispA}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  course: state.courses.newCourse,
});

export default connect(mapStateToProps)(Filters);
