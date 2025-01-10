import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { backend_api } from '../handles/ApiHandles';
import ClipLoader from "react-spinners/ClipLoader";

const IssueComplaintPage = () => {

  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

  const handleFormInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(formData.title == '' || formData.description == '' || formData.location == ''){
      toast.error("The fields cannot be empty.")
      setIsLoading(false);
      return;
    }

    const submitIssue = async () => {
      try{
        const response = await backend_api.post('complaint/', formData);
        if(response.status == 201){
          toast.success("Successfully issued your complaint");
        }
      }catch(error){
        if(error.response){
            toast.error("Couldn't fetch the data"); 
        }else if(error.request){
            toast.error("Couldn't connect to the server, Please try again later.")
        }else{
          toast.error("Some error occurred");
          console.log(error)
        } 
      }finally{
        setIsLoading(false);
        setFormData({
          title: '',
          description: '',
          location: '',
        });
      }
    }
    submitIssue();
  }

  return (
    <div className='h-[90vh] w-full flex flex-col justify-center items-center mb-48'>
        <div className='h-[80vh] w-[90%] mt-[6%] font-bold'>
            <h1 className='text-3xl font-customParaTwo w-full bg-gray-800 text-white rounded-lg py-5 px-12'>Complaint form for issuing complaint</h1>
            <form className='h-full px-8 py-4 flex flex-col gap-8 pt-12'>
              <div className='h-auto w-[40%] flex justify-between items-end'>
                <label htmlFor="title" className='text-2xl '>Title: </label>
                <input value={formData.title} onChange={handleFormInput} name='title' id='title' type="text" placeholder='Enter the title for the complaint' className='h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none' />
              </div>
              <div className='h-auto w-[40%] flex justify-between items-end'>
                <label htmlFor="description" className='text-2xl '>Description: </label>
                <input value={formData.description} onChange={handleFormInput} name='description' id='description' type="text" placeholder='Enter the description for the complaint' className='h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none' />
              </div>
              <div className='h-auto w-[40%] flex justify-between items-end'>
                <label htmlFor="location" className='text-2xl '>Location: </label>
                <input value={formData.location} onChange={handleFormInput} name='location' id='location' type="text" placeholder='Enter the location for the complaint' className='h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none' />
              </div>
              <div className='h-auto w-[40%] flex justify-between items-end'>
                <button onClick={handleFormSubmit} className={`h-full w-full bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded text-xl ${isLoading ? 'select-none pointer-events-none': ''}`}>
                  {isLoading ? (
                    <ClipLoader
                    color={'orange'}
                    size={20}
                    aria-label="Loading Spinner"
                    />
                  ): (
                    <span>Submit The Issue</span>
                  )}
                </button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default IssueComplaintPage;
