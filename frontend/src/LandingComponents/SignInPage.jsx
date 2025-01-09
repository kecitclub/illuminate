import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faKey, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { backend_api } from '../handles/ApiHandles';
import { AuthContext } from '../handles/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignInPage = ({setSignUpForm, handleFormModalClick}) => {
    
    //fetching the auth context values
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    //setting up the navigate var
    const navigate = useNavigate();

    const handleFormClick = (e) => {
        e.stopPropagation();
    }

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(formData.username == '' || formData.password == ''){
            toast.warning("Please fill every fields in the form first.");
            return;
        }

        try{
            const response = await backend_api.post('token/', formData);
            if(response.status == 200){
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                toast.success("Successfully logged in.");
                setIsAuthenticated(true);
                navigate('/');
                return;
            }
        }catch(error){
            if(error.response){
                if (error.response.status === 401) {
                    toast.error("Invalid username or password.");
                } else {
                    toast.error(`Error: ${error.response.data.detail || "Login failed."}`);
                }
            }else if(error.request){
                toast.error("Failed to connect to the server, Couldn't log in.", {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
            }else{
                toast.error('Some error has occurred.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                console.log(error);
            }
        }
        

    }
    

  return (
    <div onClick={handleFormClick} className='h-[65vh] w-[30%] relative z-[99]'>
    <form className='h-full w-full bg-theme-secondary rounded-xl px-6 py-4 border-4 border-white flex flex-col items-center gap-14 pt-12 relative'>
        <h1 className='text-3xl font-customParaTwo font-bold text-center'>Login From Here</h1>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faUser} className='text-3xl self-end'  />
            <input value={formData.username} onChange={handleFormInput} name='username' type="text" placeholder='Set An Username' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faKey} className='text-3xl self-end'  />
            <input value={formData.password} onChange={handleFormInput} name='password' type="password" placeholder='Set a Password' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <button onClick={handleFormSubmit} className='bg-theme-highlight w-[85%] h-[6vh] rounded'>Log In</button>
        <div className='w-full flex justify-center items-center -mt-6'>
            <h1>Already Have An Account? <span onClick={() => setSignUpForm(true)} className='text-blue-500 cursor-pointer'>Sign Up Instead.</span></h1>
        </div>
        <FontAwesomeIcon onClick={handleFormModalClick} icon={faXmark} className='text-2xl absolute top-4 right-4 hover:text-red-500 hover:cursor-pointer' />
        
    </form>
    </div>
  )
}

export default SignInPage;
