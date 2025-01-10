import { faBuilding, faCheck, faCircleInfo, faInfo, faLocationPin, faRightFromBracket, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const AdminComplaintCard = ({title, description, progress, username, location, status}) => {


    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }


  return (
    <div className={`${isExpanded ? 'h-[40vh]' : 'h-[20vh] '} transition-all duration-100 w-[80%] bg-gradient-to-r from-white to-green-100 rounded-lg px-4 py-2 relative flex flex-col gap-4`}>
        
        <h1 className='text-3xl mb-4 text-black font-bold'>{title ? title + " " : "Title here "}<span className='inline text-sm border-l-2 pl-1 border-black'>{username ? "By " + username : "By User"}</span> </h1>
        
        <p className={`${isExpanded ? 'h-[16%]' : 'h-[40%]'} line-clamp-2 mb-2 text-gray-600 `} >{description ? description : "Description Here"}</p>
        
        <p className={`${isExpanded ? 'text-start' : 'text-end -mt-[3%]'} `}><span className='mr-2'><FontAwesomeIcon icon={faLocationPin} /></span>{location ? location : 'Location Here'}</p>
        
        <div className={`${isExpanded ? 'relative ' : 'absolute top-2 right-2' } text-green-900`} >
            <h1><span className='mr-2'><FontAwesomeIcon icon={faBuilding} className='inline' /></span>Progress: {progress != null ? progress : '0'}% complete</h1>
        </div>

        <h1 className={`${isExpanded ? '' : 'hidden'} flex gap-2 justify-start items-center`}>
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Status: {status ? 'Verfied By Admin' : 'Not Verified'}</span>
        </h1>

        <div className='absolute left-3 bottom-3 hover:text-white active:scale-[1.02]'>
            <button onClick={handleExpand} className='px-4 py-1 bg-gray-800 text-white rounded text-sm' >
                {isExpanded ? (
                    <span>View Less</span>
                ): (
                    <span>View More</span>
                )}
            </button >
        </div>

        <div className={`${isExpanded ? '' : 'hidden'} group absolute right-3 bottom-3 active:scale-[1.02]`}>
            <button className='px-4 py-1 bg-green-500 rounded'>
                <span>Verify This Complaint</span>
                <FontAwesomeIcon className={`group-hover:inline hidden ml-2  transition-all duration-150`} icon={faCheck} />    
            </button>
            
        </div>

    </div>
  )
}

export default AdminComplaintCard;
