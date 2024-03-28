import React from 'react'
import { IoAlertCircleOutline } from "react-icons/io5";

const Notice = (props:any) => {
  const {children,className,...rest} = props
    return (
    <div
    {...rest}
        className={`${className} font-['Helvetica'] rounded-[10px] bg-white/50 border-[1px] border-white/70 flex flex-col items-center justify-start md:flex-row md:items-stretch p-[1rem] gap-[10px]`}
    >
        <IoAlertCircleOutline size={30}
            className='inline-block h-full min-w-[30px] min-h-[30px]'
        />
        <div
          className='flex items-center min-h-full' 
        >
        {children}
        </div>
    </div>
  )
}

export default Notice