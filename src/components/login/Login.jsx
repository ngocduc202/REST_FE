import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button, InputForm, InputRadio, OTPVerifier } from '..'
import { useForm } from 'react-hook-form'
import { apiRegister, apiSignIn } from 'src/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withRouter from 'src/hocs/withRouter'
import { useAppStore } from 'src/store/useAppStore'
import { useUserStore } from 'src/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from 'src/utils/firebaseConfig'
import { twMerge } from 'tailwind-merge'

const Login = () => {

  const [variant, setVariant] = useState('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { setModal } = useAppStore()
  const { token, setToken, roles } = useUserStore()
  const [isShowComfirmOTP, setIsShowComfirmOTP] = useState(false)

  useEffect(() => {
    reset()
  }, [variant])

  const handleCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-verifier', {
        size: 'invisible',
        callback: (response) => {
          // hanldeSendOTP()
        },
        'expried-callback': (response) => {

        }
      })
    }
  }

  const hanldeSendOTP = (phone) => {
    setIsLoading(true)
    handleCaptchaVerify()
    const verifier = window.recaptchaVerifier
    const formatPhone = '+84' + phone.slice(1)
    signInWithPhoneNumber(auth, formatPhone, verifier).then((result) => {
      setIsLoading(false)
      window.confirmationResult = result
      toast.success('Sent OTP to your phone')
      setIsShowComfirmOTP(true)
    }).catch((error) => {
      setIsLoading(false)
      window.isSentOTP = false
      toast.error('Something went wrong !')
    })
  }

  const onSubmit = async (data) => {
    if (variant === 'REGISTER') {
      if (data?.roleCode !== "ROL7") {
        hanldeSendOTP(data.phone)
      }
    }
    if (variant === 'LOGIN') {
      const { name, role, ...payload } = data
      const response = await apiSignIn(payload)
      if (response.success) {
        toast.success(response.mes)
        setToken(response.accessToken)
        setModal(false, null)
      } else {
        toast.error(response.mes)
      }
    }

  }

  const hanldeRegister = async (data) => {
    const response = await apiRegister(data)
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Congrats!',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Go sign in'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setVariant('LOGIN')
          setIsShowComfirmOTP(false)
        }
      })
    } else {
      toast.error(response.mes)
    }
  }

  return (
    <div onClick={e => e.stopPropagation()} className={twMerge(clsx('bg-white rounded-md px-6 py-8 w-[500px] items-center flex flex-col gap-6 text-lg relative', isShowComfirmOTP && 'w-[650px] h-[270px]'))}>
      {isShowComfirmOTP &&
        <div className='absolute inset-0 bg-white rounded-md'>
          <OTPVerifier callback={handleSubmit(hanldeRegister)} />
        </div>}
      <h1 className='text-3xl font-semibold tracking-tight font-dance'>Welcome to REIS</h1>
      <div className={twMerge(clsx('flex border-b justify-start w-full gap-6', isShowComfirmOTP && 'hidden'))}>
        <span onClick={() => setVariant('LOGIN')} className={clsx(variant === "LOGIN" && 'border-b-4 border-main-700', 'cursor-pointer')}>Login</span>
        <div id='recaptcha-verifier'></div>
        <span onClick={() => setVariant('REGISTER')} className={clsx(variant === "REGISTER" && 'border-b-4 border-main-700', 'cursor-pointer')}>New account</span>
      </div>

      <form className={twMerge(clsx('flex flex-col w-full px-4 gap-4 ', isShowComfirmOTP && 'hidden'))}>
        <InputForm register={register} id="phone" label='Phone Number' inputClassname='rounded-md' placeholder="Type your phone here" validate={{
          required: 'This field cannot empty',
          pattern: {
            value: /(0[1|3|5|7|8|9])+([0-9]{8})\b/,
            message: 'Phone number invalid'
          }
        }} errors={errors} />
        <InputForm register={register} id="password" label='Password' inputClassname='rounded-md' placeholder="Type your passowrd here" validate={{
          required: 'This field cannot empty',
        }} type='password' errors={errors} />
        {variant === 'REGISTER' &&
          <InputForm register={register} id="name" label='Fullname' inputClassname='rounded-md' placeholder="Type your full name here" validate={{ required: 'This field cannot empty' }} errors={errors} />}
        {variant === 'REGISTER' &&
          <InputRadio
            register={register}
            id="roleCode"
            label='Type account'
            option={
              roles?.filter(el => el.code !== 'ROL1')?.map(el => ({
                label: el.value,
                value: el.code
              }))
            } validate={{ required: 'This field cannot empty' }} errors={errors}
            optionClassname='grid grid-cols-3 gap-4'
          />
        }
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} className='py-2 my-6'>{variant === "LOGIN" ? 'Sign in' : 'Register'}</Button>
        <span className='cursor-pointer text-main-500 hover:underline w-full text-center'>Forgot your password?</span>
      </form>
    </div>
  )
}

export default withRouter(Login)