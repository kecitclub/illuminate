import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import blacklogo from '/blacklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

const Navigators = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //refs and animation for menu
    const navigatorsRef = useRef(null);
    useEffect(() => {
        if(isMenuOpen){
            gsap.fromTo(navigatorsRef.current.children, {
                x: 12,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
            })
        }
    }, [isMenuOpen]);
  
    return (
    <div className='h-[10vh] w-full items-center px-8 flex justify-between'>
        <img src={blacklogo} alt="logo" className='h-[200%] mt-[5%] pointer-events-none select-none' />
        <div className={`h-full w-[60%] flex justify-end items-center  `}>
            <div ref={navigatorsRef} className={`h-full w-[90%] flex justify-end items-center gap-6 ${isMenuOpen ? "" : "hidden"}`}>
                <NavLink to={'/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Complaints</NavLink>
                <NavLink to={'/myComplaints/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >My Complaints</NavLink>
                <NavLink to={'/myComplaints/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Write A Complaint</NavLink>
                <NavLink to={'/logout/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Log Out</NavLink>
            </div>
            <div className='h-full flex justify-center items-center w-[10%]'>
                {isMenuOpen ? (
                    <FontAwesomeIcon onClick={() => {setIsMenuOpen(false); animateOnClick();}} className='cursor-pointer text-3xl active:scale-[1.08] transition-all duration-100' icon={faXmark} />
                ): (
                    <FontAwesomeIcon onClick={() => setIsMenuOpen(true)} className='cursor-pointer text-3xl active:scale-[1.08] transition-all duration-100' icon={faBars} />
                )}
            </div>
        </div>
        
    </div>
  )
}

export default Navigators
