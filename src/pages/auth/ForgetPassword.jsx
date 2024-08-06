import React from 'react'
import Input from "../../components/auth/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from "../../components/shared/button/Button";

const ForgetPassword = () => {
  return (
    <div className="p-4 h-screen grid items-center">
      <div className=" p-4 lg:py-6 bg-white rounded-lg">
        <div className="pt-4 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-2xl text-center font-semibold">
            Forget Password
          </h2>
          <p className='text-sm mt-2 text-center'>Please enter your email address to reset your password.</p>
          <form className="w-full mt-4 lg:mt-6 pb-4">
            <Input type='email' placeholder='Enter your email' />
            <div className="mt-6">
                <Button type="submit" text='Reset Password' radius="10px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword