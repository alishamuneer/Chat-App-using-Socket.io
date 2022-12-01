import React, { useState, useEffect } from 'react'
import App from './App';
import { useFormik } from "formik";
import * as yup from 'yup';
import io from "socket.io-client";

let socket;

const Home = () => {

    const [showApp, setShowApp] = useState(false)

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            name: "",
            room: "",
        },
        // submit handler
        onSubmit: (values) => {

            socket.emit('join_room', values.room)
            setShowApp(true)
        },

        validationSchema: yup.object({
            name: yup.string()
                .min(3, "minimum 3 characters long")
                .max(30, "maximum 30 characters")
                .required("Required*"),
            room: yup.string()
                .required('Required*')


        })
    })

    //client connection
    useEffect(()=>{
      socket =  io.connect("http://localhost:3001")
    },[])

    return (
        <React.Fragment>
            {!showApp ?
                (
                    <div className="font-sans">
                        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                            <div className="relative sm:max-w-sm w-full">
                                <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                                <div className="card bg-[#6e2fc1] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                                <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                                    <h1 className="block mt-3 text-gray-700 text-center font-semibold text-[25px]">
                                        Join Room
                                    </h1>
                                    <div className="mt-10">

                                        <input
                                            type="text" placeholder="Your Name" name='name'
                                            className={`mt-1 pl-[20px] block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus: outline-none focus:bg-blue-100 focus:ring-0
                                                ${touched.name && errors.name ? "bg-red-200" : 'focus:bg-blue-100'}`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.name && errors.name ? <p className='text-[13px] text-red-600 pb-[5px] ml-[15px]'>{errors.name}</p> : <div className='p-[12px]'></div>}

                                        <div className="mt-3">
                                            <select
                                                name="room"
                                                className={`mt-1 pl-[20px] ${values.room !== '' ? 'text-black' : 'text-[#9b9999]'} block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus: outline-none  focus:bg-blue-100 focus:ring-0
                                                ${touched.room && errors.room ? "bg-red-200" : 'focus:bg-blue-100'}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option className='text-black' hidden >Select Room</option>
                                                <option className='text-black' value="Friends">Friends</option>
                                                <option className='text-black' value="Family">Family</option>
                                                <option className='text-black' value="Colleagues">Colleagues</option>
                                                <option className='text-black' value="Cousins">Cousins</option>
                                            </select>
                                        </div>
                                        {touched.room && errors.room ? <p className='text-[13px] text-red-600 pb-[5px] ml-[15px]'>{errors.room}</p> : <div className='p-[12px]'></div>}

                                        <div className="mt-7">
                                            <button
                                                className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                                                onClick={handleSubmit}
                                                type='submit'
                                            >
                                                Join
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )

                :

                (<App socket={socket} room={values.room} name={values.name} />)

            }
           
        </React.Fragment>
    )
}

export default Home
