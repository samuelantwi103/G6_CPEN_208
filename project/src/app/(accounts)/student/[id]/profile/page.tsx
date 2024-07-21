'use client'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const ProfilePage = (props: Props) => {
  const params = useParams()
  return (
    <>
    <div>ProfilePage</div>
    <button onClick={()=>{console.log(params.id)}}>Params</button>
    </>
  )
}

export default ProfilePage