import React from 'react'

const Image = (props:any) => {
    const {className,containerClassName,image, ...rest} = props;
  return (
    <div
    className={`${containerClassName} p-[2px] flex justify-center items-center border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))]`}
    >
        <img 
            src={image}
            className={` ${className} flex flex-1 w-full h-full justify-center items-center object-cover`}
            {...rest}
        />
    </div>
  )
}

export default Image