//basic imports
import React from "react";
import classes from "./filters.module.scss";
//components
import MyCheckbox from "../checkbox/checkbox.component";
//redux
import { connect } from "react-redux";
//reselect andselectors
import { createStructuredSelector } from "reselect";
import { selectNewCourse } from "../../redux/courses/courses.selectors";
import { checkboxNewCourse } from "../../redux/courses/courses.actions";
//components
import { Course } from "../../utils/course-interface";

interface Props {
  checked: (semester: number, curse: Course) => void;
  course: Course;
}

const Filters: React.FC<Props> = ({ checked, course }) => {
  //this component gets rendered ony if data is not null
  return (
    <>
      <div className={classes.FilterHeadline}>:סינון סמסטרים</div>
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
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  course: selectNewCourse,
});

const mapDispatchToProps = (dispatch: any) => ({
  checked: (filter: number) => dispatch(checkboxNewCourse(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
