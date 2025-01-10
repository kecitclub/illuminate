import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
                const url = 'progressReport/' + complaint  + '/'
                console.log('the url to fetch');
                console.log(url)
                const response = await backend_api.get(url);
                if(response.status == 200){
                    setReport(response.data);
                    console.log(response.data);
                }
                console.log(response.data)
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

  return (
    <div>
      <h1>Complaint Page</h1>
    </div>
  )
}

export default ViewProgressReport;
