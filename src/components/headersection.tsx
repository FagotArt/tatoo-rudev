import React from 'react'

const HeaderSection = (props:any) => {
    const { children, className, ...rest } = props;
  return (
    <div className="pt-[15px] rounded-[20px] text-black">
        <div className={`pt-[100px] pb-[2rem] rounded-t-[20px] px-[2rem] bg-[linear-gradient(to_bottom,#EFEFEF,#CFCFCF)] mx-[12px] ${className}`}>
        {children}
        </div>
      </div>
  )
}

export default HeaderSection