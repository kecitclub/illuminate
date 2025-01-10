import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AdminAuthContext } from '../handles/AdminAuthProvider';
import { useNavigate } from 'react-router-dom';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import AdminHomePage from './AdminHomePage';
import { backend_api } from '../handles/ApiHandles';

const AdminLoginRoute = () => {

    const navigate = useNavigate();

    const {isAdminLoggedIn, setIsAdminLoggedIn} = useContext(AdminAuthContext);


    useLayoutEffect(() => {

        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        if(refreshToken && accessToken) {
            setIsAdminLoggedIn(true);
        }

    }, []);



    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleInputs = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const [loading, setLoading] = useState(false);
    const logIn = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if(formData.username == '' || formData.password == ''){
            toast("Both fields are required.", {
                className: 'custom-toast',
                progressClassName: 'custom-progress-bar',
            });
            setLoading(false);
            return;
        }

        try {
            const isAdminResponse = await backend_api.post('verifyAdmin/', formData);
            if(isAdminResponse.status == 200){
                    const response = await backend_api.post('token/', formData);
                    const accessToken = response.data.access;
                    const refreshToken = response.data.refresh;
                    
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    setIsAdminLoggedIn(true);
                    navigate('/admin'); 
            }else{
                toast("You are not an admin.", {
                    className: 'custom-toast-fail',
                    progressClassName: 'custom-progress-bar-fail',
                });
            }

        } catch (error) {
            if(error.response){
                if(error.response.status === 403){
                    toast.error("You cannot login here.");
                }else{
                    toast.error("Couldn't log in.");
                }
            }
            else if(error.request){
                    toast.error("Some error occurred while logging in.");
            }else{
                toast.error("Some error occurred");
            }
            console.log(error);
        }finally{
            setLoading(false);
        }
    
        setFormData({
            username: "",
            password: "",
        });
        console.log(formData);
    };


  return (
    <>
        {isAdminLoggedIn ? (
            <AdminHomePage />
        ): (
        <div className='h-screen w-screen flex flex-col gap-4 justify-center items-center bg-[rgba(120,120,120)]'>
            <form onSubmit={logIn} className='h-[50vh] w-[26%] rounded-xl shadow-dense bg-gray-950 border-2 border-white flex flex-col gap-10 px-4 py-2 items-center relative' >
                <div className='mb-4 mt-2'>
                    <h1 className='text-2xl text-center font-bold text-gray-200'>Hey There Admin !</h1>
                </div>
                <div className='flex flex-col justify-center items-center w-[85%]'>
                    <label htmlFor="username" className='flex gap-1 justify-center items-center self-start text-gray-300'>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Admin Username</span>
                    </label>
                    <input value={formData.username} onChange={handleInputs} type="text" name='username' className='bg-gray-950 border-b border-orange-500 p-2 focus:outline-none w-full text-gray-400' autoComplete='off'/>
                </div>
                <div className='flex flex-col justify-center items-center w-[85%]'>
                    <label htmlFor="password" className='flex gap-1 justify-center items-center self-start text-gray-300'>
                        <FontAwesomeIcon icon={faKey} />
                        <span>Admin Password</span>
                    </label>
                    <input value={formData.password} onChange={handleInputs} type="password"  name='password' className='bg-gray-950 border-b border-orange-500 p-2 focus:outline-none w-full text-gray-400' autoComplete='off'/>
                </div>
                <div className='flex flex-col justify-center items-center h-[8%] w-[85%]'>
                    <button onClick={logIn} type='submit' className='w-full bg-orange-500 text-black rounded h-[100%] hover:bg-yellow-500 font-medium flex justify-center items-center'>
                        {loading ? (
                            <ClipLoader
                            color={'orange'}
                            size={20}
                            aria-label="Loading Spinner"
                            />
                        ): (
                            <span>Submit</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
        )}
    </>
  )
}

export default AdminLoginRoute;
