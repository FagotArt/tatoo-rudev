'use client'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

interface FAQProps {
  title: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const FaqSection = (props: FAQProps) => {
  const { title, children,...rest } = props
    const [toggle, setToggle] = useState(false)
    return (
    <div
        {...rest}
    >
        <div
            className='text-[1.5rem] cursor-pointer mb-[10px]  flex justify-between items-center'
            onClick={() => setToggle(!toggle)}
        >
            <div>
            {title}
            </div>
            <FaChevronDown className={`transform duration-300 ${toggle ? "rotate-180" : ""}`} />
        </div>
        <div
            className={`grid overflow-hidden duration-300 ${toggle ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
            <div
                className='min-h-0 text-white/70'
            >
                {children}
            </div>
        </div>
    </div>
  )
}

export default FaqSection