import React from 'react'
import { useAppStore } from 'src/store/useAppStore'

const Modal = () => {
  const { contentModal, setModal } = useAppStore()
  return (
    <div onClick={() => setModal(false, null)} className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-overlay-50 z-[1000]'>
      {contentModal}
    </div>
  )
}

export default Modal