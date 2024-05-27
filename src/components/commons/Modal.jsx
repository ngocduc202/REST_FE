import React from 'react'
import { useAppStore } from 'src/store/useAppStore'

const Modal = () => {
  const { contentModal, setModal } = useAppStore()
  return (
    <div onClick={() => setModal(false, null)} className='fixed w-full h-full flex items-center justify-center bg-overlay-50 z-[1000]'>
      {contentModal}
    </div>
  )
}

export default Modal