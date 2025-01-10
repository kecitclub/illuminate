import React, { useEffect, useState } from "react";
import ComplaintCard from "./ComplaintCard";
import { backend_api } from "../handles/ApiHandles";
import { toast } from "react-toastify";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredcomplaints] = useState([]);
  const [searchVal, setSearchval] = useState("");

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await backend_api.get("complaint/");
        console.log(response.data);
        setComplaints(response.data);
      } catch (error) {
        if (error.response) {
          toast.error("Couldn't fetch the data");
        } else if (error.request) {
          toast.error(
            "Couldn't connect to the server, Please try again later."
          );
        } else {
          toast.error("Some error occurred");
        }
      }
    };
    getComplaints();
  }, []);

  const handelSearch = (searchVal) => {
    if (!searchVal) {
      setFilteredcomplaints(complaints);
      return;
    }
    const filteredComplaints = complaints.filter((complain) => {
      return complain.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilteredcomplaints(filteredComplaints);
  };

  useEffect(() => {
    if (complaints.length > 0) {
      handelSearch(searchVal);
    }
  }, [complaints, searchVal]);

  return (
    <div className="h-[90vh] w-full flex flex-col justify-center items-center">
      <div className="h-[80vh] w-[90%] mt-[7%] font-bold">
        <input
          className="w-full -mt-[5%] mb-4 max-w-md pl-10 pr-4 py-2 border flex ml-auto border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition hover:ring-2 hover:ring-blue-300"
          placeholder="Search"
          onChange={(e) => setSearchval(e.target.value)}
        />
        <h1 className="text-3xl font-customParaTwo bg-gray-800 text-white py-5 rounded-lg px-12 flex justify-between items-center">
          <span>Complaints from users across the ward</span>
          <p className="text-sm text-white-500 ">
            Total Complaints: {complaints.length}
          </p>
        </h1>

        <div className="h-auto w-full mt-16 flex flex-col justify-center items-center gap-12">
          {filteredComplaints.map((complain) => (
            <ComplaintCard
              key={complain.id}
              id={complain.id}
              title={complain.title}
              location={complain.location}
              description={complain.description}
              progress={complain.progress}
              username={complain.username}
            />
          ))}
          <div className="h-[5vh] w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
