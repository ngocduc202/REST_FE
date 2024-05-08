import React from 'react'

const Button = ({ children, className, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=''
    >
      {children}
    </button>
  )
}

export default Button