"use client"

import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div className="w-full flex-1 flex-center">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </div>
  )
}

export default SignUpPage
