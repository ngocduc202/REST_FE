import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { Button } from '..';

const OTPVerifier = ({ phone, callback }) => {

  const [otp, setOtp] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const hanldeComfirmOTP = () => {
    setIsLoading(true)
    window.confirmationResult.confirm(otp).then(result => {
      setIsLoading(false)
      callback()
    }).catch(err => {
      setIsLoading(false)
    })
  }

  return (
    <div className='p-4 flex flex-col items-center justify-center h-full gap-8'>
      <span>We sent OTP code to your phone number <span>{phone}</span>. Please check your phone </span>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props}
          className='h-20 otp-item border rounded-md outline-none inline-block border-blue-600 text-lg mx-1'
          autoFocus
        />
        }
      />
      <div className='flex gap-4 items-center justify-center'>
        <Button disabled={isLoading} onClick={hanldeComfirmOTP}>
          Comfirm OTP
        </Button>
        <Button onClick={() => setOtp('')} className='bg-orange-600'>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default OTPVerifier