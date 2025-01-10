import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { backend_api } from '../handles/ApiHandles'; 
import { toast } from 'react-toastify';

const WriteAReportPage = () => {
    const { complaint_id } = useParams(); // Get the complaint_id from the URL

    const [isLoading, setIsLoading] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null, // Store the image file here
    });

    // Handle form input changes
    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submission logic
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true during the request

        // Prepare FormData for the POST request
        const data = new FormData();
        data.append('title', formData.title);
        data.append('progress', formData.progress);
        data.append('description', formData.description);
        data.append('complaint', complaint_id); // Attach the complaint ID
        if (formData.image) {
            data.append('image', formData.image); // Attach the image file
        }

        try {
            // POST request to the backend API to create a progress report
            const response = await backend_api.post('progressReport/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct content type for file upload
                },
            });

            if (response.status === 201) {
                toast.success('Report submitted successfully');
            } else {
                toast.error("Couldn't Post The Report");
            }
        } catch (error) {
            // Handle errors and show appropriate error messages
            if (error.response) {
                toast.error("Couldn't submit the report");
                console.log(error.response.data);
            } else if (error.request) {
                toast.error("Couldn't connect to the server");
                console.log(error.request);
            } else {
                toast.error("Some error occurred");
                console.log(error.message);
            }
        } finally {
            // Reset form data and set loading state to false
            setIsLoading(false);
            setFormData({
                title: '',
                description: '',
                progress: 0,
                image: null,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        setFormData((prev) => ({
            ...prev,
            image: file, // Update the state with the selected file
        }));
    };

    return (
        <div className="h-[90vh] w-full pt-16 px-8">
            <h1 className="text-3xl font-customParaTwo bg-gray-800 text-white py-5 rounded-lg px-12 flex justify-between items-center">
                <span>Write A Report Here</span>
            </h1>
            <div className="h-auto w-full mt-16 flex flex-col justify-center items-center gap-12">
                <form
                    onSubmit={handleFormSubmit}
                    className="h-[60vh] w-full flex justify-start items-center gap-12 px-8 py-4 flex-col pt-12 scale-[1.2]"
                >
                    <div className="h-auto w-[60%] flex justify-between items-end">
                        <label htmlFor="title" className="text-2xl">
                            Title:{' '}
                        </label>
                        <input
                            value={formData.title}
                            onChange={handleFormInput}
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Enter the title for the complaint"
                            className="h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none"
                        />
                    </div>
                    <div className="h-auto w-[60%] flex justify-between items-end">
                        <label htmlFor="description" className="text-2xl">
                            Description:{' '}
                        </label>
                        <input
                            value={formData.description}
                            onChange={handleFormInput}
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Enter the description for the complaint"
                            className="h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none"
                        />
                    </div>
                    <div className="h-auto w-[60%] flex justify-between items-end">
                        <label htmlFor="description" className="text-2xl">
                            Progress(%):{' '}
                        </label>
                        <input

                            value={formData.progress}
                            onChange={handleFormInput}
                            name="progress"
                            id="progress"
                            type="number"
                            placeholder="Enter the percentage of progress to increment"
                            className="h-[6vh] rounded px-4 py-2 bg-theme-primary border-b-2 border-black w-[60%] focus:outline-none"
                        />
                    </div>
                    <div className="h-auto w-[60%] flex justify-between items-end">
                        <label htmlFor="image-input" className="text-2xl">
                            Add a progress image:
                        </label>
                        <input
                            id='image-input'
                            type='file'
                            onChange={handleFileChange}
                            className='text-black'
                        />
                    </div>

                    <div className="h-auto w-[60%] flex justify-between items-end">
                        <button
                            type="submit"
                            className={`h-full w-full bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded text-xl ${
                                isLoading ? 'select-none pointer-events-none' : ''
                            }`}
                        >
                            {isLoading ? (
                                <ClipLoader color={'orange'} size={20} aria-label="Loading Spinner" />
                            ) : (
                                <span>Add The Report</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WriteAReportPage;
