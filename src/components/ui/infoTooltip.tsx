import React from 'react'
import { BsQuestionCircle } from "react-icons/bs";
const InfoToolTip = (props:any) => {
    const {children,className} = props
  return (
    <div
        className={`relative [&:hover>.tooltip]:opacity-[1] [&:hover>.tooltip]:pointer-events-auto ${className}`}
    >
        <BsQuestionCircle size={30}/>
        <div
            className="tooltip z-[20] font-['Helvetica'] duration-300 pointer-events-none opacity-0 absolute top-[50px] left-[50%] transform translate-x-[-50%] bg-white rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] p-[1rem] min-w-[200px] text-black text-[0.9rem]"
        >
            {children}
        </div>
    </div>
  )
}

export default InfoToolTip