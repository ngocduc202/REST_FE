import clsx from 'clsx'
import React from 'react'
import { createSearchParams } from 'react-router-dom'
import withRouter from 'src/hocs/withRouter'
import { twMerge } from 'tailwind-merge'

const PaginationItem = ({ content, page, navigate, location }) => {
  const hanldeChangePage = () => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: content }).toString()
    })
  }
  if (!Number(content)) return <div className='w-10 h-10 rounded-md px-1 bg-main-50 text-main-500 flex items-end justify-center'>
    {content}
  </div>
  return (
    <button
      type='button'
      onClick={hanldeChangePage}
      className={twMerge(clsx('w-10 h-10 cursor-pointer rounded-md px-1 bg-main-50 text-main-500 flex items-center justify-center font-bold',
        !page && +content === 1 && "bg-main-500 text-white",
        +page && +content === +page && "bg-main-500 text-white"
      ))}>{content}</button>
  )
}

export default withRouter(PaginationItem)