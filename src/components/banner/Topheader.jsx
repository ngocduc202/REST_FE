import React, { Fragment, useEffect, useRef, useState } from 'react'
import { MdMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from 'src/hocs/withRouter';
import { useUserStore } from 'src/store/useUserStore';
import { showOptions } from 'src/utils/constants';
import { Link } from 'react-router-dom';



const Topheader = ({ location }) => {
  const { current, Logout } = useUserStore()
  const optionBox = useRef()
  const [isShowOptions, setIsShowOptions] = useState(false)
  useEffect(() => {
    const handleOnclick = (e) => {
      if (optionBox.current && optionBox.current.contains(e.target)) {
        setIsShowOptions(true)
      } else {
        setIsShowOptions(false)
      }
    }
    window.addEventListener("click", handleOnclick)
    return () => {
      window.removeEventListener("click", handleOnclick)
    }
  }, [])


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
        {current &&
          <div ref={optionBox} onClick={() => setIsShowOptions(true)} className='flex items-center relative cursor-pointer hover:bg-overlay-30 p-2 rounded-md gap-4 pl-8 border-l border-main-400'>
            <div className='flex flex-col gap-2'>
              <span>{current?.name}</span>
              <span>ID : <span>{current?.id?.slice(0, 6)}</span></span>
            </div>
            <img src={current?.avatar || '/user.svg'} alt="avatar" className='w-12 h-12 object-cover rounded-full' />
            {isShowOptions &&
              <div className='absolute z-9999 right-0 top-full bg-white rounded-md text-black drop-shadow-sm flex flex-col py-2 border'>
                {showOptions.map(el =>
                (<Fragment key={el.id}>
                  {current?.userRoles?.some(role => role.roleCode === el.code) && <Link to={el.path} className='px-6 py-2 hover:bg-gray-100'>{el.name}</Link>}
                </Fragment>
                )
                )}
                <span onClick={() => Logout()} className='px-6 py-2 hover:bg-gray-100 cursor-pointer'>Logout</span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default withRouter(Topheader)