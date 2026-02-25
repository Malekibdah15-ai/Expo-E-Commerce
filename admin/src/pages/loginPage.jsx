import React from 'react'
import { SignIn } from "@clerk/clerk-react";
function LoginPage() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignIn />
    </div>
  )
}

export default LoginPage
