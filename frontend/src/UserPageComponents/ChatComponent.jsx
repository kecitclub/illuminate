import { text } from '@fortawesome/fontawesome-svg-core';
import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { toast } from 'react-toastify';

const ChatComponent = () => {

    const [chatLog, setChatLog] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }


    const inputRef = useRef(null);
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsLoading(true);

            if(inputRef.current.value == ''){
                toast.error("Please type something to start conversation.")
            }

            setChatLog((prevChatLog) => [...prevChatLog, { text: userInput, isUser: true }]);
            console.log(chatLog)
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
                }finally{
                    setIsLoading(false);
                    inputRef.current.focus();
                }
            };
          
            fetchData();
        }
    };

    
    useEffect(() => {
        inputRef.current.focus();
    });

    const handleClearChat = () => {
        setChatLog([]);
    }


  return (
    <div className='h-full w-full mt-[0.5%] rounded-t bg-[#ECFBF5] flex-col'>
        <div className='h-[80%]  w-full overflow-y-scroll no-scrollbar px-6 py-4 flex flex-col bg-gray'>

            {chatLog.map((message, index) => (
            <h1 className={`${message.isUser ? 'text-left self-start w-[50%] mb-12 bg-grey text-[15px]' : "text-right self-end w-[50%] mb-12 "}`} key={index}>{message.isUser ? 'You:  ': "Jana Sewa(Bot):  " } <span className=' px-4 py-2 text-left'>
                <ReactMarkdown className={`${message.isUser ? "text-left" : ''} ${message.isUser !== true && message.text.length <= 100 ? 'text-right bg-[#D3D3D3] rounded-[5px]': 'text-left bg-[#D3D3D3] rounded-[5px]'}`}>{message.text}</ReactMarkdown>
            </span></h1>
            ))}
        </div>



        <div className="mt-10">
        <div className="flex items-center bg-[#ECFBF5] shadow-md rounded-lg p-4">
          <input
            
            placeholder={`${isLoading ? 'Loading.....': 'Enter the prompt '}`}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={inputRef} onKeyDown={handleKeyDown} value={userInput} onChange={handleUserInput} type="text"  disabled={isLoading}
          />
          <button  onClick={handleClearChat} className="ml-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"><FontAwesomeIcon icon={faBroom} className='text-2xl'/>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent;
