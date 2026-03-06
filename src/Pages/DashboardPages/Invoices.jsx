import React from 'react';
import { ReceiptIcon } from "lucide-react";

const Invoices = () => {
    return (
        <div>
            <h1 className='text-4xl font-bold dark:text-white'>Invoices</h1>
            <p className='text-md font-medium text-gray-500'>View all your payment history</p>
            
            {/* no invoice  ui */}
            {/* <div className='bg-white dark:bg-slate-900 mt-4 w-full h-screen rounded-2xl'>

                <div className='mt-5 py-40  text-slate-700 dark:text-slate-500 gap-y-4 flex flex-col justify-center items-center'>
                    <ReceiptIcon className="w-20 h-20"/>
                    <p className='text-lg font-medium'>No payments made yet</p>
                </div>
            </div> */}


                    {/* lg screen in voice */}

            <div className='bg-white dark:bg-slate-900 mt-4 w-full h-screen rounded-2xl'>
                
            </div>
        </div>
    );
};

export default Invoices;