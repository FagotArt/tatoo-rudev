import React from 'react'

const BackgroundSection = (props:any) => {
    const {children,image,imageStyle,className,containerClassName,...rest} = props
  return (
    <div
        className={`relative ${containerClassName}`}
    >
        <img
          src={image}
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          style={imageStyle || {
            WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
            maskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%),rgba(0,0,0,0)",
          }}
        />
        <div
            className={`relative z-1 ${className}`}
            {...rest}
        >
            {children}
        </div>
    </div>
  )
}

export default BackgroundSection