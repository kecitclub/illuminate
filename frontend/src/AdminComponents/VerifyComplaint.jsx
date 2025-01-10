import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AdminComplaintCard from './AdminComplaintCard';
import { backend_api } from '../handles/ApiHandles';

const VerifyComplaint = () => {

    const [complaints, setComplaints] = useState([]);
    
    useEffect(() => {
        const getComplaints = async () => {
            try{
                const response = await backend_api.get('complaint/');
                console.log(response.data);
                setComplaints(response.data);
            }catch(error){
                if(error.response){
                    toast.error("Couldn't fetch the data"); 
                }else if(error.request){
                    toast.error("Couldn't connect to the server, Please try again later.")
                }else{
                    toast.error("Some error occurred");
                    console.log(error)
                }
            }
        }
        getComplaints();
    }, []);



  return (
    <div className='h-[90vh] w-full pt-16 px-8'>
    <h1 className="text-3xl font-customParaTwo bg-gray-800 text-white py-5 rounded-lg px-12 flex justify-between items-center">
        <span>Complaints from users across the ward for admin</span>
    </h1>
    <div className='h-auto w-full mt-16 flex flex-col justify-center items-center gap-12'>
        {complaints.map(complain => (
            <AdminComplaintCard key={complain.id} title={complain.title} location={complain.location} description={complain.description} progress={complain.progress} username={complain.username} status={complain.admin_verified} />
        ))}
        <div className='h-[5vh] w-full'></div>
    </div>



    </div>
  )
}

export default VerifyComplaint;
