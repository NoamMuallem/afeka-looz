import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

interface Props extends RouteComponentProps<any> {}

const BackButton: React.FC<Props> = ({ history }) => {
  return (
    <Button
      style={{
        borderRadius: "50%",
        width: "47px",
        height: "47px",
        textAlign: "center",
        margin: "auto auto",
        padding: "auto auto",
      }}
      onClick={() => history.goBack()}
      variant="outline-light"
    >
      <FontAwesome
        className="super-crazy-colors"
        name="fas fa-arrow-right"
        size="2x"
        style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
      />
    </Button>
  );
};

export default withRouter(BackButton);
