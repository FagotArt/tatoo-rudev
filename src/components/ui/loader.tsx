/* HTML: <div class="loader"></div> */
import React from "react";

const Loader = (props: any) => {
  const { className, color = "white" } = props;

  const loaderStyle = {
    "--bg-color": color,
  };

  return (
    <div
      className={`${className} loader`}
      //@ts-ignore
      style={loaderStyle}
    ></div>
  );
};

export default Loader;
