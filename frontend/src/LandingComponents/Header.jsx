import React, { useRef, useState } from 'react'
import SignUpPage from './SignUpPage';
import blacklogo from '/blacklogo.png';
import SignInPage from './SignInPage';

const Header = () => {


    const [signUpForm, setSignUpForm] = useState(null);


    //for handling form pop up and form modal ref
    const formModalRef = useRef(null);

    const handleFormPopUp = () => {
        formModalRef.current.classList.remove('hidden');
        formModalRef.current.classList.add('flex');
    }

    const handleFormModalClick = () => {
        formModalRef.current.classList.remove('flex');
        formModalRef.current.classList.add('hidden');
    }


    
    
  return (
    <div className='h-[10vh] w-full flex justify-between items-center px-6 text-black text-lg relative z-[999]'>
      <img src={blacklogo} alt="logo" className='h-[200%] mt-[5%]' />
      <div className='h-full w-[40%] flex justify-end items-center gap-10'>
            <button onClick={() => {handleFormPopUp(); setSignUpForm(true);}}  className='px-6 h-[60%] bg-green-500  text-white border-2 border-black hover:bg-green-600 transition-all duartion-100 rounded-xl '>Sign Up</button>
            <button onClick={() => {handleFormPopUp(); setSignUpForm(false);}} className='px-6 h-[60%] bg-green-500 border-2 text-white border-black rounded-xl transition-all duration-100 hover:bg-green-600 '>Log In</button>
      </div>

      <div ref={formModalRef} onClick={handleFormModalClick} className={`h-screen w-full hidden fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[99]`}>
        {signUpForm ? (
            <SignUpPage setSignUpForm={setSignUpForm} handleFormModalClick={handleFormModalClick} />
        ): (
            <SignInPage setSignUpForm={setSignUpForm} handleFormModalClick={handleFormModalClick} />
        )}
      </div>


    </div>
  )
}

export default Header
