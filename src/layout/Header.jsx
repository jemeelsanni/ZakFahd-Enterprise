import React from 'react'
import profile from "../assets/images/profile.png"

const Header = () => {
  return (
    <div className='flex justify-between w-full bg-[#0B245B] text-white px-8 py-2 items-center'>
        <div>   </div>
        <h3 className=' text-2xl font-semibold'>ZakFahd Enterprises</h3>
        <div className='flex flex-row gap-4'>
            <img className=' rounded-full h-12 w-12' src={profile} alt="" />
            <div className=" text-center">
                <p>Zakari Fahd</p>
                <p>Admin</p>
            </div>
        </div>
    </div>
  )
}

export default Header