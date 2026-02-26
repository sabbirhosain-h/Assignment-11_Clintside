import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    
    return (
        <div className='flex flex-col justify-center items-center dark:bg-slate-800 min-h-screen '>

            <img className='h-25 w-25 rounded-2xl' src="../../public/Librisgo.jpg" alt="" />

           
                <h1 
                className='text-9xl font-extrabold
                bg-[url(https://media.istockphoto.com/id/497749432/photo/space.jpg?s=612x612&w=0&k=20&c=Sdayj_gOzGQqQA-BPTRrxo1eZLIVSRZnbk1UG8L5aQ4=)]
                bg-cover bg-center text-transparent bg-clip-text'>
                    Oppps!
                </h1>
                <p className='text-3xl mt-4'>404 Page not Found</p>

                <Link to="/" className='Primary-btn mt-4 px-3 py-4 rounded-3xl text-amber-50'>
                Return to home page
                </Link>


        </div>
    );
};

export default Error;