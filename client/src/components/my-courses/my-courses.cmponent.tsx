import React from "react";
import classes from "./my-courses.module.scss";
import CartCourse from "./cart-curse/cart-course.component";
import { Button } from "react-bootstrap";
//excel utils
import { courseToJson } from "../../utils/json-data";
import { excelBuilder } from "../../utils/excel-builder";
import { Course } from "../../utils/course-interface";

interface Props {
  courses: Array<Course>;
  setNewCourse: (courseNumber: string) => void;
  deleteCourse: (courseNumber: string) => void;
}

const MyCourses: React.FC<Props> = ({
  courses,
  setNewCourse,
  deleteCourse,
}) => {
  const createExcelFile = () => {
    excelBuilder(courseToJson(courses));
  };

  return (
    <div className={classes.Container}>
      {courses.length === 0 ? (
        <span>לא נבחרו קורסים</span>
      ) : (
        <Button
          style={{ maxWidth: "90px", marginBottom: "16px" }}
          size="lg"
          onClick={() => createExcelFile()}
          variant="success"
        >
          הורדה
        </Button>
      )}
      <div className={classes.CourseList}>
        {courses.map((course) => (
          <CartCourse
            key={course.courseNumber}
            course={course}
            setNewCourse={() => setNewCourse(course.courseNumber)}
            deleteCourse={() => deleteCourse(course.courseNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
