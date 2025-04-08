import { login } from '@/store/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        dispatch(login(formData)); 
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [isAuthenticated]);

    return (
        <section className='w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-[#f9f7f7]'>
            <div className='bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]'>
                <h1 className='text-[#D8125B] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl'>Login</h1>
                <form className='flex flex-col gap-5 w-full' onSubmit={handleLogin}>
                    <p className='font-semibold text-xl md:text-2xl'>Login Details</p>
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none' />
                            <label className='text-[16px] text-stone-600'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none' />
                        </div>
                    </div>
                    <button className='bg-[#D8125B] font-semibold hover:bg-[#f13479] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white  mx-auto lg:w-[300px] sm:w-[300px] mb-4' type='submit' disabled={loading}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;  
