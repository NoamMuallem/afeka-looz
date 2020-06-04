import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const MyTextInput = ({ click, loading }) => {
  let number = "";
  return (
    <InputGroup
      size="sm"
      style={{ width: "250px", margin: "40px auto", padding: "auto auto" }}
    >
      <FormControl
        onChange={(e) => (number = e.target.value)}
        aria-describedby="basic-addon1"
      />
      <InputGroup.Prepend>
        {!loading ? (
          <Button onClick={() => click(number)} variant="outline-light">
            חיפוש
          </Button>
        ) : (
          <Button disabled variant="outline-light">
            חיפוש
          </Button>
        )}
      </InputGroup.Prepend>
    </InputGroup>
  );
};

export default MyTextInput;
