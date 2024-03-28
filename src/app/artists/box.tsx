'use client'
import React from 'react'
import { GoHeartFill, GoHeart } from "react-icons/go";

const Box = (props:any) => {
    return <div
        className='cursor-pointer'
    >{props.checked ? <GoHeartFill className='text-[1.2rem]' onClick={props.onClick} /> : <GoHeart className='text-[1.2rem]' onClick={props.onClick} />}</div>;

}

export default Box