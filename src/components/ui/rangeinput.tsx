import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeInput = ({ min=0, max=500,onChange,className,values }: any) => {
    const [internalValues, setInternalValues] = useState([min, max]);

    useEffect(() => {
        if(!values) return
        setInternalValues(values)
    }, [values])

    const handleChange=(values:any)=>{
        setInternalValues(values)
        onChange && onChange(values)
    }

    return (
        <div
            className={`${className} pt-[0.5rem] pb-[2rem] px-[2rem] flex justify-center items-center`}
        >
            <Range
                step={1}
                min={min}
                max={max}
                values={internalValues}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-[5px] rounded-md w-full"
                        style={{...props.style,
                            background : getTrackBackground({
                                values:internalValues,
                                colors: ["#ccc",'rgba(0,0,0,0.3)', "#ccc"],
                                min,
                                max
                            })
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={(pr:any) => {
                    const {props,value} = pr
                    return  <div
                        {...props}
                        className="relative w-[15px] h-[15px] bg-gray-500 rounded-full focus:outline-none"
                    >
                        <div
                            className="absolute top-[20px] left-0"
                        >
                            £{value}
                        </div>
                    </div>
                }}
            />
        </div>
    );
};

export const SingleRangeInput = ({min=0,max=1,step=1,onChange,className,value}:any)=>{
    const [internalValue,setInternalValue] = useState([(min+max)/2])

    useEffect(()=>{
        if(!value) return
        setInternalValue(value)
    },[value])

    const handleChange=(value:any)=>{
        setInternalValue(value)
        onChange && onChange(value)
    }

    return <div
        className={`${className} pt-[0.5rem] pb-[0.5rem] px-[2rem] flex justify-center items-center`}
    >
        <Range
                step={step}
                min={min}
                max={max}
                values={internalValue}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-[5px] rounded-md w-full"
                        style={{...props.style,
                            background : getTrackBackground({
                                values:internalValue,
                                colors: ["#ccc",'rgba(0,0,0,0.3)', "#ccc"],
                                min,
                                max
                            })
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={(pr:any) => {
                    const {props,value} = pr
                    return  <div
                        {...props}
                        className="relative w-[15px] h-[15px] bg-gray-500 rounded-full focus:outline-none"
                    >
                    </div>
                }}
            />
    </div>
}

export default RangeInput;
