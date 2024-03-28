import React from 'react'

const RoundedTitle = (props:any) => {
    const {children,className,contentClassName,...rest} = props;
  return (
    <div
    {...rest}
    className={`${className} p-[3px] pl-0 bg-[linear-gradient(to_top,gray,white,#CACACA)] flex justify-start rounded-r-full items-center`}
    >
        <div
            className={`${contentClassName}  bg-[linear-gradient(to_bottom,#3B3B3B,#141414)] rounded-r-full p-[1rem] flex-1 font-bold text-[1.5rem]`}
        >
        {children}
        </div>
    </div>
  )
}

export default RoundedTitle