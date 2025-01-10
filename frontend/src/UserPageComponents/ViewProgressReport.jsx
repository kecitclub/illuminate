import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backend_api } from '../handles/ApiHandles';

const ViewProgressReport = () => {

    const {complaint_id} = useParams();

    const [report, setReport] = useState([])

    useEffect(() => {
        console.log(complaint_id);
        const handleFetchData = async () => {
            try{
                const complaint = complaint_id
                const url = 'progressReport/' + complaint  + '/';
                const response = await backend_api.get(url);
                if(response.status == 200){
                    setReport(response.data);
                }
            }catch(error){
                if(error.response){
                    toast.error("Couldn't fetch the data");
                    console.log(error);
                }else if(error.request){
                    toast.error("Couldn't connect to the server");
                    console.log(error);
                }else{
                    toast.error("Some error occurred");
                    console.log(error);
                }
            }

        }
        handleFetchData();
    }, []);

    const base_image_path = 'http://127.0.0.1:8000';

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

  return (
    <div className='h-screen w-full bg-orange mt-[5%] px-8 py-2'>
        <h1 className='text-3xl font-bold font-customPara'>Progress Report</h1>
        {report.length == 0 && (
            <>
            <h1 className='flex justify-center items-center mt-12 text-xl font-bold'>No Progress Yet</h1>
            <div className='h-auto flex justify-center items-center gap-4 mt-4'>
                <Link onClick={handleGoBack} className='bg-orange-600 px-6 py-2 rounded text-black'>Go Back</Link>
                <Link to={'/'} className='bg-orange-600 px-6 py-2 rounded text-black'>Home</Link>
            </div>
            </>
        )}
        {report.map(rep => (
            <div key={rep.id} className='h-auto  border-t-2 border-black py-4 bg-full mt-[2%] flex flex-col gap-3'>
                <h1 className='text-2xl text-black font-bold'>{rep.title}</h1>
                <h2 className='text-xl text-gray-500 font-customHeading'>{rep.description}</h2>
                <img src={base_image_path + rep.image} alt="work-progress-image" className='h-[30vh] w-[30vw] rounded-xl shadow-2xl shadow-black' />
            </div>
        ))}

    </div>
  )
}

export default ViewProgressReport;
