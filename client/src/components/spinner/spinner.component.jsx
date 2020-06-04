import React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const MySpinner = ({ loading }) => {
  const override = css`
    position: fixed;
    top: 35%;
    left: 50%;
    margin-left: -40px;
    display: block;
    border-color: red;
  `;

  return (
    <HashLoader css={override} size={80} color={"#22d1ee"} loading={loading} />
  );
};

export default MySpinner;
