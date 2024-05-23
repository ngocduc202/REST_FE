import React, { useEffect, useState } from 'react'
import bannerProperty from '../../assets/bannerProperty.png'
import { BreadCrumb, Button, InputSelect, PropertyCard } from 'src/components'
import { apiGetProperties } from 'src/apis/properties'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

const Properties = () => {

  const [properties, setProperties] = useState(null)
  const [mode, setMode] = useState('ALL')
  const { register, formState: { errors }, watch } = useForm()
  const sort = watch('sort')

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await apiGetProperties({ limit: 9 })
      if (response.success) {
        setProperties(response.properties)
      }
    }
    fetchProperties()
  }, [])


  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <img src={bannerProperty} alt="banner" className='w-full object-contain' />
        <div className='absolute inset-0 text-white flex flex-col items-center justify-center'>
          <h1 className='text-[48px] font-medium'>Properties</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className='w-main mx-auto my-20'>
        <div className='my-4 flex justify-between text-base items-center'>
          <div>
            <InputSelect
              register={register}
              id='sort'
              errors={errors}
              placeholder='Select'
              options={[
                { label: 'Lastest', value: '-createdAt' },
                { label: 'Oldest', value: 'createdAt' },
                { label: 'A - Z', value: 'name' },
                { label: 'Z - A', value: '-name' },
              ]}
              containerClassname='flex-row items-center gap-2'
              label='Sort : '
              inputClassname='w-fit rounded-md'
            />
          </div>
          <div className='flex items-center gap-4'>
            <Button onClick={() => setMode('ALL')} className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-gray-900 font-medium', mode === 'ALL' && 'font-bold'))}>All Properties</Button>
            <Button onClick={() => setMode('RENT')} className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-gray-900 font-medium', mode === 'RENT' && 'font-bold'))}>For Rent</Button>
            <Button onClick={() => setMode('SALE')} className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-gray-900 font-medium', mode === 'SALE' && 'font-bold'))}>For Sale</Button>
          </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-4'>
          {properties?.rows?.map(el => (
            <PropertyCard
              key={el.id}
              properties={el}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Properties