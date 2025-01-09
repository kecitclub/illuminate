import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faKey, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

const SignUpPage = ({setSignUpForm, handleFormModalClick}) => {

    const handleFormClick = (e) => {
        e.stopPropagation();
    }




  return (
    <div onClick={handleFormClick} className='h-[78vh] w-[30%] relative z-[99]'>
    <form className='h-full w-full bg-theme-secondary rounded-xl px-6 py-4 border-4 border-white flex flex-col items-center gap-14 pt-12 relative'>
        <h1 className='text-3xl font-customParaTwo font-bold text-center'>Register From Here</h1>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faUser} className='text-3xl self-end'  />
            <input type="text" placeholder='Set An Username' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faKey} className='text-3xl self-end'  />
            <input type="password" placeholder='Set a Password' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faKey} className='text-3xl self-end'  />
            <input type="password" placeholder='Re-Type The Password' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <button className='bg-theme-highlight w-[85%] h-[6vh] rounded'>Sign Up</button>
        <div className='w-full flex justify-center items-center -mt-6'>
            <h1>Already Have An Account? <span onClick={() => setSignUpForm(false)} className='text-blue-500'>Login Instead.</span></h1>
        </div>
        <FontAwesomeIcon onClick={handleFormModalClick} icon={faXmark} className='text-2xl absolute top-4 right-4 hover:text-red-500 hover:cursor-pointer' />
        
    </form>
    </div>
  )
}

export default SignUpPage;
