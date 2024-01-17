import React from 'react'
import BorderDivider from './borderdivider';

const BigTitle = (props:any) => {
  const { children, className, ...rest } = props;
    return (
    <div
        className={`relative bg-[linear-gradient(to_bottom,#F5F5F5,#D0D0D0)] text-[3rem] text-black text-center max-w-[min(90%,600px)] mx-auto ${className}`}
    >
        <img 
            src="/images/icons/skull.png"
            className='absolute top-0 right-0 translate-y-[-25%] translate-x-[50%] h-[200%] object-contain'
            // className='absolute top-[-1rem] right-[0.2rem] translate-y-[-25%] translate-x-[50%] h-[200%] object-contain'
        />
        <BorderDivider
            className='w-full mx-auto'
        />
        <div
            className='py-[1rem] text-[2rem] md:text-[3rem]'
        >
        {children}
        </div>
        <BorderDivider
            className='w-full mx-auto'
        />
        <img 
            src="/images/icons/skull.png"
            className='absolute top-0 left-0 translate-y-[-25%] translate-x-[-50%] h-[200%] object-contain scale-x-[-1]'
            // className='absolute top-[-1rem] left-[0.2rem] translate-y-[-25%] translate-x-[-50%] h-[200%] object-contain scale-x-[-1]'
        />
    </div>
  )
}

export default BigTitle