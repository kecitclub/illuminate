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
    <div className='h-full w-full mt-[0.5%] rounded-t bg-gradient-to-r from-white to-green-100 flex-col'>
        <div className='h-[90%] w-full overflow-y-scroll no-scrollbar px-6 py-4 flex flex-col bg-gray'>
            {chatLog.map((message, index) => (
            <h1 className={`${message.isUser ? 'text-left self-start w-[50%] mb-12' : "text-right self-end w-[50%] mb-12"}`} key={index}>{message.isUser ? 'You:  ': "Jana Sewa(Bot):  " } <span className=' px-4 py-2 text-left'>
                <ReactMarkdown className={`${message.isUser ? "text-left" : ''} ${message.isUser !== true && message.text.length <= 100 ? 'text-right': 'text-left'}`}>{message.text}</ReactMarkdown>
            </span></h1>
            ))}
        </div>
        <div className='h-[10%] flex justify-start items-center gap-4'>
            <input ref={inputRef} onKeyDown={handleKeyDown} value={userInput} onChange={handleUserInput} type="text" placeholder={`${isLoading ? 'Loading.....': 'Enter the prompt '}`} className={`h-full w-[90%] bg-gray-800 text-white rounded-r px-10 py-2 focus:outline-none font-normal text-xl placeholder:text-lg ${isLoading ? "": ""}`} disabled={isLoading} />
            <h1 onClick={handleClearChat} className='h-full border-t-2 border-black flex justify-center items-center cursor-pointer hover:text-red-800'><FontAwesomeIcon icon={faBroom} className='text-2xl' />Clear Chat</h1>
            
        </div>
    </div>
  )
}

export default ChatComponent;
