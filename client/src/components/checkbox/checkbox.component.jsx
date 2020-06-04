import React from "react";
import { Form } from "react-bootstrap";

const MyCheckbox = ({ str, click, checked, disp }) => {
  return (
    <Form.Check
      checked={checked}
      onChange={click}
      disabled={!disp}
      inline
      label={str}
    />
  );
};

export default MyCheckbox;
