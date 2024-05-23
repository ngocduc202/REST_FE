import React from 'react'
import SearchItem from './SearchItem'
import { Button, InputForm, InputSelect } from '..'
import { useForm } from 'react-hook-form'

const Search = () => {

  const { register, formState: { errors } } = useForm()

  return (
    <div className='bg-white rounded-md drop-shadow-md py-8 grid grid-cols-4 w-[1096px] mx-auto h-[8em] mt-[-4em] relative z-20'>
      <SearchItem title='Locations' >
        <InputForm
          id='address'
          register={register}
          errors={errors}
          placeholder='Type your required locations'
          containerClassname='w-[14em]'
          inputClassname='rounded-md border border-gray-300'
        />
      </SearchItem>
      <SearchItem title='Property Type' >
        <InputSelect
          id='propertyType'
          register={register}
          errors={errors}
          containerClassname='w-[14em]'
          inputClassname='rounded-md border border-gray-300'
          placeholder='Select property type'
        />
      </SearchItem>
      <SearchItem title='Rent range' >
        <InputSelect
          id='price'
          register={register}
          errors={errors}
          containerClassname='w-[14em]'
          inputClassname='rounded-md border border-gray-300'
          placeholder='Select rent range'
        />
      </SearchItem>
      <div className='flex items-center justify-center'>
        <Button className='px-8 bg-main-600'>
          Search
        </Button>
      </div>
    </div>
  )
}

export default Search