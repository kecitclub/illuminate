import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useState } from 'react'

const ChatComponent = () => {

    const [chatLog, setChatLog] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }


    const addMessage = (text, isUser) => {
        setChatLog((prevChatLog) => [...prevChatLog, { text, isUser }]);
    };
      
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setChatLog((prevChatLog) => [...prevChatLog, { text: userInput, isUser: true }]);
            setUserInput("");


            const fetchData = async () => {
                const apiKey = "AIzaSyBb2xkGgDBfkD2oh_xZjdRJ9uT-U_z5vvc";
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          
                const requestBody = {
                  contents: [
                    {
                      parts: [{ text: userInput }]
                    }
                  ]
                };
          
                try {
                  const response = await axios.post(url, requestBody, {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  });
                  
                  const botText = response.data.candidates[0].content.parts[0].text; 
                  console.log();
                  setChatLog((prevChatLog) => [...prevChatLog,{ text: botText, isUser: false },]);
            
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
            };
          
            fetchData();
        }
    };


    const handleClearChat = () => {
        setChatLog([]);
    }


  return (
    <div className='h-full w-full bg-gray-400 flex-col'>
        <div className='h-[90%] w-full overflow-y-scroll no-scrollbar px-6 py-4'>
            {chatLog.map((message, index) => (
            <h1 className={`${message.isUser ? 'text-left' : "text-right"}`} key={index}>{message}</h1>
            ))}
        </div>
        <div className='h-[10%] flex justify-start items-center gap-4'>
            <input onKeyDown={handleKeyDown} value={userInput} onChange={handleUserInput} type="text" placeholder='Enter the prompt' className='h-full w-[90%] bg-[rgb(120,120,140)] rounded-r px-10 py-2 focus:outline-none font-normal text-xl placeholder:text-lg' />
            <h1 onClick={handleClearChat} className='cursor-pointer hover:text-red-800'><FontAwesomeIcon icon={faBroom} className='text-2xl' />Clear Chat</h1>
            
        </div>
    </div>
  )
}

export default ChatComponent;
