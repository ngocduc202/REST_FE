import React from 'react'
import logo_light from "../../assets/logo_light.png"
import { Link, NavLink } from 'react-router-dom'
import { Button, Login } from '..'
import { navigations } from 'src/utils/constants'
import clsx from 'clsx'
import withRouter from 'src/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from 'src/store/useUserStore'
import { useAppStore } from 'src/store/useAppStore'

const Navigation = ({ location }) => {
  const { current } = useUserStore()
  const { setModal } = useAppStore()
  return (
    <div className={twMerge(clsx('bg-transparent fixed z-50 top-[85px] w-full px-[100px] py-[26px] flex items-center justify-between',
      location.pathname !== '/' && 'bg-white'
    ))}>
      <Link to={"/"}>
        <img src={logo_light} alt="" className='w-[120px] object-contain' />
      </Link>
      <div className={clsx('flex text-lg items-center gap-8', location.pathname === '/' ? 'text-main-100a' : 'text-gray-700 ')}>
        {navigations.map(el => (
          <NavLink className={({ isActive }) =>
            clsx(isActive && 'text-white font-medium', location.pathname === '/' ? 'text-white' : 'text-gray-900')
          } key={el.id} to={el.path}>
            {el.text}
          </NavLink>
        ))}
        {!current ?
          <Button className={twMerge(clsx(location.pathname === '/' && 'bg-transparent border-main-100 border'))}
            onClick={() => setModal(true, <Login />)}
          >
            Sign in
          </Button> :
          <Button className={twMerge(clsx(location.pathname === '/' && 'bg-transparent border-main-100 border'))}>
            Add Listing
          </Button>
        }
      </div>
    </div>
  )
}

export default withRouter(Navigation)