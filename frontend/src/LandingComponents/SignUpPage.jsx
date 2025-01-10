import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faKey, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { backend_api } from '../handles/ApiHandles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../handles/AuthProvider';

const SignUpPage = ({setSignUpForm, handleFormModalClick}) => {

    const handleFormClick = (e) => {
        e.stopPropagation();
    }

    
    //handling form data below this
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [rePassword, setRePassword] = useState('');

    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const hanldeRePassword = (e) => {
        setRePassword(e.target.value);
    }


    //context for loggin the user in 
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    //var to use for navigating 
    const navigate = useNavigate();

    //submitting the form
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(formData.username == '' || formData.password == '' || rePassword == ''){
            toast.warning("Please fill every fields in the form first.");
            return;
        }

        if(formData.password !== rePassword){
            toast.warning("The passwords do not match.");
            return;
        }

        try{
            const response = await backend_api.post('', formData);
            if(response.status == 201){
                toast.success(response.data.detail)
                try{
                    const loginResponse = await backend_api.post('token/', formData);
                    if(loginResponse.status == 200){
                        localStorage.setItem('accessToken', loginResponse.data.access);
                        localStorage.setItem('refreshToken', loginResponse.data.refresh);
                        toast.success("Successfully logged in.");
                        setIsAuthenticated(true);
                        navigate('/');
                    }
                }catch(error){
                    if(error.response){
                        toast.error('Failed to Log In.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                    }else if(error.request){
                        toast.error("Failed to connect to the server, Couldn't log in.", {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                    }else{
                        toast.error('Some error has occurred.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                        console.log(error);
                    }
                }
            }
        }catch(error){
            if(error.response){
                if(error.response.data.username){
                    toast.error('Username already taken', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                    return;
                }
                toast.error('Failed to Sign Up.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                console.log(error)
            }else if(error.request){
                toast.error('Failed to connect to the server, Please try again later.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
            }else{
                toast.error('Some error has occurred.', {className: "custom-toast-fail", progressClassName: "custom-progress-bar-fail"});
                console.log(error);
            }
        }finally{
            setFormData({
                username: '',
                password: '',
            });
            setRePassword('');
        }
    }
  return (
    <div onClick={handleFormClick} className='h-[78vh] w-[30%] relative z-[99]'>
    <form className='h-full w-full bg-theme-secondary rounded-xl px-6 py-4 border-4 border-white flex flex-col items-center gap-14 pt-12 relative'>
        <h1 className='text-3xl font-customParaTwo font-bold text-center'>Register From Here</h1>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faUser} className='text-3xl self-end'  />
            <input value={formData.username} onChange={handleFormInput} name='username' type="text" placeholder='Set An Username' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faKey} className='text-3xl self-end'  />
            <input value={formData.password} onChange={handleFormInput} name='password' type="password" placeholder='Set a Password' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <div className=' w-full flex justify-center items-center gap-4'>
            <FontAwesomeIcon icon={faKey} className='text-3xl self-end'  />
            <input value={rePassword} onChange={hanldeRePassword} name='rePassword' type="password" placeholder='Re-Type The Password' className='bg-theme-secondary text-xl focus:outline-none text-gray-900 h-[6vh] w-[80%] px-6 rounded placeholder:text-xl border-b-2 border-black'/>
        </div>
        <button onClick={handleFormSubmit} className='bg-green-500 text-white hover:bg-green-600 w-[85%] h-[6vh] rounded'>Sign Up</button>
        <div className='w-full flex justify-center items-center -mt-6'>
            <h1>Already Have An Account? <span onClick={() => setSignUpForm(false)} className='text-blue-500 cursor-pointer'>Login Instead.</span></h1>
        </div>
        <FontAwesomeIcon onClick={handleFormModalClick} icon={faXmark} className='text-2xl absolute top-4 right-4 hover:text-red-500 hover:cursor-pointer' />
        
    </form>
    </div>
  )
}

export default SignUpPage;
