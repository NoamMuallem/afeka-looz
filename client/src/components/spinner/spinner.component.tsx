import React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import { connect } from "react-redux";

interface Props {
  loading: boolean;
}

const MySpinner: React.FC<Props> = ({ loading }) => {
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

const mapStateToProps = (state: any) => ({
  loading: state.courses.loading,
});

export default connect(mapStateToProps)(MySpinner);
