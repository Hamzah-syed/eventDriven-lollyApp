import React from "react";

const ErrorMsg = (props) => {
  return (
    <div>
      <p className="errorMsg">{props.children}</p>
    </div>
  );
};

export default ErrorMsg;
