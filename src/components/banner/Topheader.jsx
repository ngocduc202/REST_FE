import React from 'react'
import { MdMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from 'src/hocs/withRouter';


const Topheader = ({ location }) => {
  return (
    <div className={twMerge(clsx('h-[85px] text-white border-b border-main-400 bg-transparent fixed z-50 top-0 w-full px-[100px] flex items-center justify-between  py-[26px]',
      location.pathname !== '/' && 'bg-main-700'
    ))}>
      <span className='flex items-center gap-2'>
        <MdMailOutline />
        <span>
          <span>Email us at : </span>
          <span className='text-gray-300'>example@gmail.com</span>
        </span>
      </span>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-6 text-gray-300'>
          <FaFacebookF />
          <FaInstagram size={20} />
          <FaYoutube size={23} />
        </div>
        <div className='flex items-center pl-8 border-l border-main-400'>
          <span className='flex items-center gap-2'>
            <AiOutlinePhone />
            <span className='text-gray-300'>123-456-7890</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Topheader)