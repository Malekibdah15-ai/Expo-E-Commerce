import React from 'react'

function LoginPage() {
  return (
    <div>
      <h1>Hello Admin</h1>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      {/* Show the user button when the user is signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default LoginPage
