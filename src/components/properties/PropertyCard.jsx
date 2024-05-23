import React from 'react'
import { MdOutlineAttachMoney, MdOutlineRemoveRedEye } from 'react-icons/md'
import { formatMoney } from 'src/utils/fn'
import { BiArea } from "react-icons/bi";
import { IoBedOutline, IoShareSocialOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { LiaBathSolid } from "react-icons/lia";

const PropertyCard = ({ properties }) => {
  return (
    <div className='border rounded-md'>
      <img src={properties?.featuredImage} alt="" className='w-full h-[240px] object-cover rounded-t-md' />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold uppercase line-clamp-2 text-gray-700'>{properties?.name}</h1>
        <span className='text-lg flex items-center font-bold text-main-500'><MdOutlineAttachMoney size={20} />{`${formatMoney(properties?.price)}`}</span>
        <div className='flex items-center gap-4 text-sm'>
          <span className='flex gap-2 items-center text-gray-500'>
            <IoBedOutline size={20} />
            <span className='font-medium text-base'>{properties?.bedRoom}</span>
          </span>
          <span className='flex gap-2 items-center text-gray-500'>
            <LiaBathSolid size={20} />
            <span className='font-medium text-base'>{properties?.bathRoom}</span>
          </span>
          <span className='flex gap-2 items-center text-gray-500'>
            <BiArea size={20} />
            <span className='font-medium text-base'>{properties?.propertySize}<span>m<sup>2</sup></span></span>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img src={properties?.rPostedBy?.avatar} alt="" className='w-10 h-10 object-cover rounded-full' />
              <span className='text-gray-500'>{properties?.rPostedBy?.name}</span>
            </div>
            <span className='px-4 py-1 text-xs flex items-center justify-center bg-green-600 text-white'>Agent</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'><IoShareSocialOutline /></span>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'><IoIosHeartEmpty /></span>
          </div>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img src={properties?.rOwner?.avatar} alt="" className='w-10 h-10 object-cover rounded-full' />
              <span className='text-gray-500'>{properties?.rOwner?.name}</span>
            </div>
            <span className='px-4 py-1 text-xs flex items-center justify-center bg-purple-600 text-white'>Onwer</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'><IoShareSocialOutline /></span>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'><IoIosHeartEmpty /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard