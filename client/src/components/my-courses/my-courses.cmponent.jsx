import React from "react";
import classes from "./my-courses.module.scss";
import CartCourse from "./cart-curse/cart-course.component";
import { Button } from "react-bootstrap";

const MyCourses = ({
  courses,
  checked,
  changeNewCourse,
  deleteCourse,
  excel,
}) => {
  return (
    <div className={classes.Container}>
      {courses.length === 0 ? (
        <span>לא נבחרו קורסים</span>
      ) : (
        <Button
          style={{ maxWidth: "90px", marginBottom: "16px" }}
          size="lg"
          onClick={() => excel()}
          variant="success"
        >
          הורדה
        </Button>
      )}
      <div className={classes.CourseList}>
        {courses.map((course) => (
          <CartCourse
            key={course.courseNumber}
            checked={checked}
            course={course}
            changeNewCourse={changeNewCourse}
            deleteCourse={() => deleteCourse(course.courseNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
