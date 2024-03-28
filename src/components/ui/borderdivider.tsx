import React from 'react'

const BorderDivider = (props:any) => {
  const { className } = props;
  return (
    <div className={`${className} h-[5px] bg-[linear-gradient(to_right,white,#626262,#B6B6B6,#797979)] mx-[12px] w-[calc(100%-24px)] bg-white border-[1px] border-black`}></div>
  )
}

export default BorderDivider