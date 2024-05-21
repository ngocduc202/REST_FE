import React, { Fragment, useState } from 'react'
import logo from '../../assets/logo_light.png'
import { adminSidebar } from 'src/utils/constants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretDown } from 'react-icons/fa'

const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([])

  const handleActiveTab = (tabId) => {
    if (activeTabs.some(el => el === tabId)) {
      setActiveTabs(prev => prev.filter(el => el !== tabId))
    } else {
      setActiveTabs(prev => [...prev, tabId])
    }
  }

  return (
    <div className='h-screen w-full'>
      <div className='w-full flex flex-col p-4 items-center justify-center'>
        <img src={logo} alt="logo" className='w-4/5 object-contain' />
        <small className='text-gray-100 italic'>Admin workspace</small>
      </div>
      <div className='mt-6'>
        {adminSidebar.map(el => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" &&
              <NavLink to={el.path} className={({ isActive }) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-main-300  px-4 py-3',
                isActive && 'bg-main-700 border-r-4'
              )}>
                <span className='text-2xl'>{el.icon}</span>
                <span className='select-none'>{el.name}</span>
              </NavLink>}
            {el.type === "PARENT" && (
              <>
                <div onClick={() => handleActiveTab(el.id)} className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700'>
                  <span className='flex items-center gap-2'>
                    <span className='text-2xl'>{el.icon}</span>
                    <span className='select-none'>{el.name}</span>
                  </span>
                  {activeTabs.some(tabId => tabId === el.id) ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
                </div>
                {activeTabs.some(tabId => tabId === el.id) &&
                  <div className=''>
                    {el.subs.map(sub =>
                      <NavLink to={sub.path} key={sub.id} className={({ isActive }) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-main-300  px-4 py-3',
                        isActive && 'bg-main-700 border-r-4'
                      )}>
                        <span >{sub.name}</span>
                      </NavLink>
                    )}
                  </div>
                }
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar