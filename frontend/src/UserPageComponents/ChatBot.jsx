import React, { useState } from 'react'
import ChatComponent from './ChatComponent';

const ChatBot = () => {
    
    return (
    <div className='h-[90vh] w-full flex flex-col justify-center items-center'>
        <div className='h-[65vh] w-[90%] -mt-[1%] font-bold'>
            <h1 className='text-3xl rounded-t-lg font-customParaTwo w-full bg-gray-800 text-white rounded-lg py-5 px-12'>Chat with a bot to solve the issue</h1>
            <div className='h-full w-full flex flex-col justify-center items-center gap-12'>
                <ChatComponent />
            </div>
        </div>
    </div>
  )
}

export default ChatBot;
  