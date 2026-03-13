import React, { useContext, useEffect, useState } from 'react';
import { ReceiptIcon } from "lucide-react";
import { motion } from "motion/react"
import useAPIs from '../../Hooks/useAPIs';
import { AuthContext } from '../../Context/AuthProvider';

const Invoices = () => {
    const instance = useAPIs();
    const { user } = useContext(AuthContext);
    const [invoice , setInvoice] = useState([])
    useEffect(()=>{
        const getMyInvoices = async () => {
            try {
                const res = await instance.get(`/Invoice?Myemail=${user.email}`);
                setInvoice(res.data);
            
            } catch (error) {
                console.error(error)
            }
        }
        getMyInvoices();
    },[])

    if (!invoice) return <Load />;
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

            <div className='bg-white dark:bg-slate-900 p-10 mt-4 w-full h-screen rounded-2xl'>
                <h1 className='font-semibold text-2xl dark:text-white'>Payment History</h1>



                <div className="hidden lg:block rounded-t-2xl mt-4 overflow-y-auto overflow-x-hidden max-h-screen">
          <table className="rounded-t-2xl bg-white dark:bg-slate-900 w-full">
            <thead>
              <tr className="dark:bg-slate-800">
                {["Payment ID", "Book Name", "Amount", "Date", "Status"].map((head) => (
                  <th key={head} className=" tablehead dark:text-white">{head}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              
              {
                invoice.map((data , i)=> (
                    <motion.tr
                  key={data._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800"
                >

                  {/* Book */}
                  <td className="px-4 py-3 dark:text-white">
                      {data.orderId}
                  </td>

                  {/* Order Date */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                   {data.bookName}
                  </td>

                
                  {/* Price */}
                  <td className="px-6 py-3 text-left font-medium dark:text-white">৳ {data.price}</td>

                    {/* date */}
                  <td className="dark:text-white px-4 py-3">
                   {data.date.split("T")[0]}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center  ">
                    <span className='px-3 py-2 bg-green-700 rounded-2xl text-white'>Paid</span>
                  </td>

                 
                </motion.tr>
                ))
              }

            </tbody>
          </table>
        </div>
            </div>
        </div>
    );
};

export default Invoices;