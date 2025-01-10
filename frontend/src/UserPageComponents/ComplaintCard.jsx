﻿import { faBuilding, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'

const ComplaintCard = ({title, description, progress, username, location}) => {

  return (
    <div className='h-[20vh] w-[80%] bg-gradient-to-r from-white to-green-100 rounded-lg px-4 py-2 relative'>
        <h1 className='text-3xl mb-4 text-black font-bold'>{title ? title + " " : "Title here "}<span className='inline text-sm border-l-2 pl-1 border-black'>{username ? "By " + username : "By User"}</span> </h1>
        <p className='line-clamp-2 mb-2 text-gray-600 h-[40%]'>{description ? description : "Description Here"}</p>
        <p className='text-end'><span className='mr-2'><FontAwesomeIcon icon={faLocationPin} /></span>{location ? location : 'Location Here'}</p>
        <div className='absolute top-2 right-2 text-green-900' >
            <h1><span className='mr-2'><FontAwesomeIcon icon={faBuilding} className='inline' /></span>Progress: {progress != null ? progress : '0'}% complete</h1>
        </div>
    </div>
  )
}

export default ComplaintCard
