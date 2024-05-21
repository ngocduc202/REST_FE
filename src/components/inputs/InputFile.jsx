import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdCloudUpload } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { apiUploadImages } from 'src/apis/beyond';
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';


const InputFile = ({ containerClassname, label, id, validate, multiple, getImages, errors }) => {
  const { register, watch } = useForm()
  const rawImages = watch(id)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const hanldeUpload = async (files) => {
    const formData = new FormData()
    const imageLink = []
    const uploadPromise = []
    setIsLoading(true)
    for (let file of files) {
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      uploadPromise.push(apiUploadImages(formData))
    }
    const response = await Promise.all(uploadPromise)
    setIsLoading(false)
    if (response && response.length > 0) {
      const tempArrImage = []
      for (let result of response) {
        if (result.status === 200) tempArrImage.push({
          id: result.data.public_id,
          path: result.data.secure_url
        })
      }
      setImages(tempArrImage)
    } else {
      toast.error('Something went wrong !')
    }
  }
  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      hanldeUpload(rawImages)
    }
  }, [rawImages])

  useEffect(() => {
    getImages(images)
  }, [images])
  const hanldeDeleteImage = (e, imageId) => {
    e.preventDefault()
    setImages(prev => prev.filter(item => item.id !== imageId))
  }
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && <span className='font-medium text-main-700' htmlFor={id}>{label}</span>}
      <input
        type='file'
        id={id}
        {...register(id, validate)}
        className='hidden'
        multiple={multiple}
      />
      <label htmlFor={id} className='bg-gray-100 w-full p-16 flex items-center flex-col gap-2 justify-center'>
        {isLoading ? <span className='animate-spin text-main-600'><ImSpinner2 size={25} /></span> :
          images?.length > 0 ?
            <div className='grid grid-cols-4 gap-4 '>
              {images.map((el, index) => (
                <div key={index} className='col-span-1 relative'>
                  <span
                    onClick={(e) => hanldeDeleteImage(e, el.id)}
                    className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-1'><AiOutlineCloseCircle size={18} /></span>
                  <img src={el.path} alt="" className='w-full object-contain' />
                </div>
              ))}
            </div>
            :
            <>
              <span className='text-5xl text-gray-300'><MdCloudUpload /></span>
              <small className='text-gray-500 italic'>Only support image with extension JPEG , PNG , JPG</small>
            </>
        }
      </label>
      {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputFile