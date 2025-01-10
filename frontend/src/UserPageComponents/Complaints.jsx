import React, { useEffect, useState } from 'react'
import ComplaintCard from './ComplaintCard'
import { backend_api } from '../handles/ApiHandles';
import { toast } from 'react-toastify';

const Complaints = () => {

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
                }
            }
        }
        getComplaints();
    }, []);
    
  return (
    <div className='h-[90vh] w-full flex flex-col justify-center items-center'>
        <div className='h-[80vh] w-[90%] mt-[6%] font-bold'>
        <h1 className="text-3xl font-customParaTwo bg-gray-800 text-white py-5 rounded-lg px-12 flex justify-between items-center">
  <span>Complaints from users across the ward</span>
  <p className="text-sm text-white-500 ">Total Complaints: {complaints.length}</p>
</h1>

            <div className='h-auto w-full mt-16 flex flex-col justify-center items-center gap-12'>
                {complaints.map(complain => (
                    <ComplaintCard key={complain.id} title={complain.title} location={complain.location} description={complain.description} progress={complain.progress} username={complain.username} />
                ))}
                <div className='h-[5vh] w-full'></div>
            </div>
            
        </div>
    </div>
    
  )
}

export default Complaints
