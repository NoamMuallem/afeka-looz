//basic imports
import React from "react";
//components
import { Form } from "react-bootstrap";

interface Props {
  str: string;
  click: () => void;
  checked: boolean;
  disp: boolean;
}

const MyCheckbox: React.FC<Props> = ({ str, click, checked, disp }) => {
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
