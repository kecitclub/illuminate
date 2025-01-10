import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import blacklogo from '/blacklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import { AdminAuthContext } from '../handles/AdminAuthProvider';

const Header = () => {
    
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

    //navigate to home page after logout 
    const navigate = useNavigate();
    const {isAdminLoggedIn, setIsAdminLoggedIn} = useContext(AdminAuthContext);
    const logOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAdminLoggedIn(false);
        toast.success('Logged Out Successfully');
        navigate('/admin');
    }
  
    return (
    <div className='h-[10vh] w-full items-center px-8 flex justify-between'>
        <img src={blacklogo} alt="logo" className='h-[170%] mt-[3%] pointer-events-none select-none' />
        <div className={`h-full w-[60%] flex justify-end items-center  `}>
            <div ref={navigatorsRef} className={`h-full w-[90%] flex justify-end items-center gap-6 mt-[5%] ${isMenuOpen ? "" : "hidden"}`}>
                <NavLink to={'/admin'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Verify Complaints</NavLink>
                <NavLink to={'/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Update Complaints</NavLink>
                <NavLink to={'/'} className={({ isActive }) =>
                    isActive
                        ? "text-xl font-customHeading underlineAnimator relative border-b-2 border-black select-none"
                        : "text-xl font-customHeading underlineAnimator relative select-none"
                    } >Delete A Complaint</NavLink>
                <button onClick={logOut} className={"text-xl font-customHeading underlineAnimator relative select-none"}>Log Out</button>
            </div>
            <div className='h-full flex justify-center items-center w-[10%] mt-[5%]'>
                {isMenuOpen ? (
                    <FontAwesomeIcon onClick={() => {setIsMenuOpen(false);}} className='cursor-pointer text-3xl active:scale-[1.08] transition-all duration-100' icon={faXmark} />
                ): (
                    <FontAwesomeIcon onClick={() => setIsMenuOpen(true)} className='cursor-pointer text-3xl active:scale-[1.08] transition-all duration-100' icon={faBars} />
                )}
            </div>
        </div>
        
    </div>
  )
}

export default Header;
