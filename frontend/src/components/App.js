import React, { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import { HiPaperAirplane } from "react-icons/hi2";
import { BsEmojiLaughing } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const App = ({ socket, name, room }) => {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [chosenEmoji, setChosenEmoji] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const inputHandler = (e) => {
        setMessage(e.target.value)
    }

    //Send message to other user
    const sendMsg = async () => {
        if (message === '') {
            toast.error('Invalid Input', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        else {
            const data = {
                message,
                name,
                room,
                date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit('send_message', data)
            setChat(chat => [...chat, data])
            setMessage('')
        }
    }

    //capitalize the First letter of name
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //set selected emoji
    const onEmojiClick = (e) => {
        setChosenEmoji(e.native)
    }

    //show emoji picker
    const showEmojiBox = () => {
        if (showEmoji === false) {
            setShowEmoji(true)
        }
        else {
            setShowEmoji(false)
        }

    }

    useEffect(() => {
        //get message from other user
        const msgHandler = (data) => {
            setChat(chat => [...chat, data]);
        }
        socket.on("receive_message", msgHandler);

        return () => socket.off("receive_message", msgHandler);

    }, [socket]);

    //set emoji in input feild
    useEffect(() => {
        setMessage(message + chosenEmoji)
    }, [chosenEmoji])


    return (
        <React.Fragment>
            <div className='flex justify-center items-center flex-col w-full h-[100vh] bg-[whitesmoke]'>
                <div className='shadow-xl'>
                    <h1 className='bg-[url("./images/bg.jpg")] border-t border-x w-[50vh] border-[#e1e1e1] text-white p-[10px] text-center text-[21px] font-bold'>{room} Room</h1>
                    <ScrollToBottom className='bg-[url("./images/chat-bg.jpg")] bg-opacity-50 w-[50vh] h-[60vh] border shadow-inner bg-[#f9f9f9] border-[#e1e1e1]'>
                        {chat.map((chatContent, i) => {
                            return (
                                <div key={i} className="p-[10px] pl-[10px]">
                                    <div className={`${name === chatContent.name ? 'text-end' : 'text-start'}`}>
                                        <div className="space-y-2 text-xs mx-2 order-2">
                                            <div>
                                                <span className={`px-4 py-2 text-[18px] rounded-lg inline-block rounded-bl-none ${name === chatContent.name ? 'bg-[#1a53f3] text-white' : 'bg-[#ccc] text-black'} `}>{chatContent.message}</span>
                                            </div>
                                        </div>

                                        <div className="text-[10px]">
                                            <span className='mr-[5px]'>{chatContent.date}</span>
                                            <span className='mr-[10px] font-bold'>{capitalizeFirst(chatContent.name)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollToBottom>
                    <div className='flex justify-between border p-[10px] bg-white border-[#e1e1e1] border-b border-x w-[50vh]'>
                        <button onClick={showEmojiBox} className='border border-none  mr-1'><BsEmojiLaughing className='text-[#6e2fc1] text-[23px]' /></button>

                        <input name='message' type='text'
                            value={message}
                            placeholder='Type...'
                            onChange={inputHandler}
                            className='border border-black border-none focus:outline-none w-[42vh] ml-1'
                            onKeyPress={(e) => { e.key === "Enter" && sendMsg() }}
                        />

                        <button onClick={sendMsg} className='border border-none'><HiPaperAirplane className='text-[#1a53f3] text-[23px]' /></button>
                    </div>
                </div>
                {showEmoji &&
                    <span className='absolute top-[205px] left-[367px]'>
                        <Picker data={data} onEmojiSelect={onEmojiClick} className='h-[350px]' />
                    </span>
                }
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}

export default App
