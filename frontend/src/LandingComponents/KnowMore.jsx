import React from 'react';
import slide1 from '../Assets/slide1.png'
import slide2 from '../Assets/slide2.png'
import slide3 from '../Assets/slide3.png'
import slide4 from '../Assets/slide4.png'
import slide5 from '../Assets/slide5.png'


const KnowMore = () => {
    return (
        <div className='h-[80vh] px-8 py-2 flex  w-[94%] font-customParaTwo text-black relative z-[10] text-center'>
            <div className='mt-[26vh] w-full ml-8 relative z-[-2]'>
                <h1 className='text-8xl scale-[1.2] ml-[8%]'>Jana Sewa</h1>
                <h3 className='text-2xl font-bebas ml-20'>"Your <span className='text-green-400 text-3xl'>Service</span> Our Duty"</h3><br></br>
                <h4 className='text-[18.5px]'>Jana Sewa is a comprehensive citizen service platform designed to address public grievances and promote efficient governance. It aims to bridge the gap between citizens and the government by providing a centralized system for resolving issues that affect the community. Currently available in select regions, Jana Sewa empowers individuals to voice their concerns regarding public services, infrastructure, or administrative processes.

                    The platform emphasizes accessibility and convenience, allowing users to register complaints either online or through in-person channels. Whether it’s reporting a malfunctioning streetlight, raising concerns about local governance, or seeking redress for administrative delays, Jana Sewa ensures that every grievance is acknowledged and routed to the appropriate authorities for resolution. By fostering accountability and transparency, Jana Sewa plays a vital role in strengthening the relationship between the government and its citizens, contributing to a more responsive and efficient governance framework.

                    If your region has a similar initiative, you can participate by submitting your concerns through their website, mobile application, or designated service centers. Take advantage of this platform to ensure your voice is heard and contribute to building a better community for everyone. </h4> <br />
                    <div>
                    <h1 className="text-5xl ">Features</h1>
                        <hr></hr>
                        </div>
                        <div className="flex justify-center">
  <ul className="list-disc pl-5 space-y-2 text-l text-left">
     <li className="text-2xl">Sign Seamlessly</li>
     <li className="text-2xl">Complaint Management</li>
     <li className="text-2xl">Secure Authentication System</li>
     <li className="text-2xl">Citizen Engagement & Follow up</li>
  </ul>
</div>
<br /> <br />
                    
                <h1 className='text-5xl'>Jana Sewa Gallery</h1>
                <hr></hr>
                <div className=' w-full flex flex-wrap '>
                     <img className="w-[50%] p-5 rounded-[29px] "src={slide1} alt='img1'/>
                     <img className="w-[50%] p-5 rounded-[29px] "src={slide2} alt='img2'/>
                     <img className="w-[50%] p-5 rounded-[29px] "src={slide3} alt='img3'/>
                     <img className="w-[50%] p-5 rounded-[29px] "src={slide4} alt='img4'/>
                     <img className="w-[50%] p-5 rounded-[29px] "src={slide5} alt='img5'/>

                </div>    
            </div>
        </div>
    )
}

export default KnowMore;
