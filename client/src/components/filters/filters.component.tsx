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
  return (
    <div className={classes.Filters}>
      <MyCheckbox
        str={"קיץ"}
        click={() => checked(2, course)}
        checked={course.filters[2]}
        disp={course.data!.semesterC.length > 0}
      />
      <MyCheckbox
        str={"ב"}
        click={() => checked(1, course)}
        checked={course.filters[1]}
        disp={course.data!.semesterB.length > 0}
      />
      <MyCheckbox
        str={"א"}
        click={() => checked(0, course)}
        checked={course.filters[0]}
        disp={course.data!.semesterA.length > 0}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  course: state.courses.newCourse,
});

export default connect(mapStateToProps)(Filters);
