import React from "react";

const BorderDecorations = (props: any) => {
  const { rightBorder, leftBorder, topBorder, bottomBorder, top = "top-0", right = "right-[-5px]",left='left-[5px]', height = "h-[100%]",width="w-[10px]" ,className } = props;
  return <>
    {rightBorder && <img src="/images/line_border.png" className={`absolute ${top} ${right} z-[9] ${width} ${height} ${className}`} />}
    {leftBorder && <img src="/images/line_border.png" className={`absolute ${top} ${left} z-[9] ${width} ${height}  ${className}`} />}
  </>;
};

export default BorderDecorations;
