import React from "react";
import classes from "./add-course.module.scss";
import MyInput from "../text-input/text-input.component";

interface Props {
  searchCourse: (courseNumber: string) => void;
  loading: boolean;
}

const AddCourse: React.FC<Props> = ({ searchCourse, loading }) => {
  return (
    <div className={classes.Container}>
      <div>
        <span>הכנס מספר קורס לחיפוש</span>
        <MyInput loading={loading} click={searchCourse} />
        <span className={classes.HeadLine}>מספרי קורסים</span>
        <div className={classes.Links}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1245062/%D7%AA%D7%95%D7%9B%D7%A0%D7%94-%D7%AA%D7%A9%D7%A4-%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%91%D7%95%D7%A7%D7%A8.pdf"
          >
            תוכנה
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1187528/%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%AA-%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93%D7%99%D7%9D-%D7%AA%D7%A9%D7%A4-28-8-19.pdf"
          >
            רפואית
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1213532/%D7%AA%D7%A2%D7%A9%D7%99%D7%99%D7%94-%D7%95%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%AA%D7%A9%D7%A4-%D7%91%D7%95%D7%A7%D7%A8-%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93%D7%99%D7%9D-%D7%9E%D7%95%D7%A0%D7%92%D7%A9%D7%AA2.pdf"
          >
            תעשייה וניהול
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1187534/%D7%97%D7%A9%D7%9E%D7%9C-%D7%AA%D7%A9%D7%A4-%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%91%D7%95%D7%A7%D7%A8.pdf"
          >
            חשמל
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1187526/%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93%D7%99%D7%9D-%D7%9E%D7%95%D7%9E%D7%9C%D7%A6%D7%AA-%D7%94%D7%A0%D7%93%D7%A1%D7%94-%D7%9E%D7%9B%D7%A0%D7%99%D7%AA-%D7%91%D7%95%D7%A7%D7%A8-%D7%AA%D7%A9%D7%A4-%D7%A1%D7%95%D7%A4%D7%99-%D7%90%D7%95%D7%92%D7%95%D7%A1%D7%98-2019.pdf"
          >
            מכנית
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.afeka.ac.il/media/1245061/%D7%9E%D7%93%D7%A2%D7%99-%D7%94%D7%9E%D7%97%D7%A9%D7%91-%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%91%D7%95%D7%A7%D7%A8.pdf"
          >
            מדעי המחשב
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
