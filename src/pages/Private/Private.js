import React, { useContext } from 'react'
import { UserContext } from '../../utils/context/userContext'
import { Outlet, Navigate } from 'react-router-dom'

export default function Private() {
  const { currentUser } = useContext(UserContext)

  if (currentUser === null || currentUser === undefined) {
    console.log('THIS IS PRIVATE', currentUser)
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
