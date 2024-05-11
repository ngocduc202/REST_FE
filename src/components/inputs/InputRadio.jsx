import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputRadio = ({ style = 'form-radio', containerClassname, id, type = 'text', register, errors = {}, label, inputClassname, validate, placeholder, option = [] }) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
      {option.map(el => (
        <div className='flex items-center gap-3 cursor-pointer' key={el.value}>
          <input
            type='radio'
            name={id}
            id={el.value}
            value={el.value}
            className={twMerge(clsx(style, 'placeholder:text-sm', inputClassname))}
            {...register(id, validate)}
            placeholder={placeholder}
          />
          <label className='cursor-pointer' htmlFor={el.value}>{el.label}</label>
        </div>
      ))}

      {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputRadio