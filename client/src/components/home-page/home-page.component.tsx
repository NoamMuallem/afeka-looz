import React from "react";
import classes from "./home-page.module.scss";
import FontAwesome from "react-fontawesome";

const Homepage: React.FC = () => {
  return (
    <div className={classes.Homapage}>
      <h1 style={{ color: "#43dde6" }}>הורדת אקסל של קורסים באפקה</h1>
      <br />
      <h4>
        הורדת קובץ אקסל של הקורסים שרוצים לקחת ב 3 שלבים פשוטים ותוך מס' דקות
      </h4>
      <br />
      <p>נכנסים להוספת קורס ומחפשים קורס לפי מספר הקורס</p>
      <p>מסננים לפי סמסטרים רצויים ושומרים</p>
      <p>נכנסים "לקורסים שלי", עורכים או מוחקים קורסים ואז לוחצים הורד</p>
      <br />
      <p>אם אהבתם פרגנו לי בלינקדאין</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/noam-muallem-b47585176"
      >
        <FontAwesome
          className="super-crazy-colors"
          name="fab fa-linkedin"
          size="2x"
          style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
        />
      </a>
    </div>
  );
};

export default Homepage;
