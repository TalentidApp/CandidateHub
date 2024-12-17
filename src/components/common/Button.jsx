
import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <div>
        <button className='bg-[#C2202B] w-full text-white px-14 p-2 text-base text-center rounded-md' onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button;


