import React, { useState } from 'react'
import ChatComponent from './ChatComponent';
import chatbotimg from '../Assets/chatbot.png';
const ChatBot = () => {
    
    return (
       <>
       <div className='flex flex-nowrap relative'>
       <div className=' mt-[100px] w-[500px]   ml-[5%] '>
        <img  className="w-[30%] h-[30%] ml-[38%] "src={chatbotimg}/>
        <div className=' flex-wrap  text-center pt-5'>
            <h1>Meet Your Assistant <span className='text-blue-600 text-xl'>Jsewa</span></h1>
            <div className='pt-2'>
                This is your Assistant chat bot you can ask me whatever you want i can easily answer any question regarding any matter of fact
            </div>
        </div>
       </div>
       
    <div className='h-[82vh] w-[700px]  ml-auto drop-shadow-md flex flex-col justify-center items-center '>
        <div className='h-[78vh] w-[90%] -mt-[1%] font-bold '>
            <div className='h-full  w-full flex flex-col justify-center items-center '>
            <h1 className='text-3xl h-[90px] w-full flex justify-center  font-sans items-center bg-[#ECFBF5] text-blue-600'>AI Assistant</h1>    
                <ChatComponent />
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ChatBot;
  