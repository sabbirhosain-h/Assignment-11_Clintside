import React from 'react';
import { motion } from "motion/react"
import { Star, User } from 'lucide-react';

const MyOrder = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold dark:text-white">My Orders</h1>
      <p className="text-md font-medium text-gray-500">
        Books You want to Order
      </p>

      <div className="mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 w-full min-h-screen">
        <h1 className="text-md font-medium dark:text-white">
          My Order History
        </h1>

        <motion.div 
        initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
        className="hidden lg:block rounded-t-2xl  mt-4  overflow-x-auto sm:max-h-80 max-h-55 overflow-y-auto">

          <table className="rounded-t-2xl bg-white dark:bg-slate-900 w-full">

            <thead>
              <tr className="dark:bg-slate-800">
                <th className="tablehead dark:text-white">Book</th>
                <th className="tablehead dark:text-white">Order Date</th>
                <th className="tablehead dark:text-white">Price</th>
                <th className="tablehead dark:text-white">Status</th>
                <th className="tablehead dark:text-white">Payment</th>
                <th className="tablehead dark:text-white">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">

              <motion.tr 
            
                       initial={false}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.2 }}
                       layout={false}
              className="hover:bg-slate-100 dark:hover:bg-slate-800">
                
                {/* Book */}
                <td className="px-4 py-3 flex items-center gap-4">
                  <img
                    className="w-14 h-20 object-cover rounded"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
                    alt="book"
                  />
                  <div>
                    <h1 className="font-medium dark:text-white">
                      By Elena Storm
                    </h1>
                    <p className="text-sm text-gray-500">
                      Fiction Novel
                    </p>
                  </div>
                </td>

                {/* Order Date */}
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  25 Feb 2026
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-medium dark:text-white">
                  ৳450
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-700 text-white">
                    Delivered
                  </span>
                </td>

                {/* Payment */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white">
                    Paid
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <button className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition">
                    View
                  </button>
                </td>

              </motion.tr>
              
            </tbody>
          </table>

        </motion.div>

        <motion.div
               
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                //   transition= {{ delay: index * 0.05 }}
                  className="p-4 lg:hidden">
                  <div className="flex gap-4 mb-3">
                   
                    <img
                    
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
                      
                      className="w-20 h-28 object-cover rounded"/>
                    
                 
                    <div className="flex-1">
                      <h3 className="mb-1 isDark dark:text-white  text-slate-900">
                        Boi er nam</h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        by Boi er lekhok
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded text-sm isDark text-white   bg-blue-600">
                          Horror
                        </span>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm isDark  dark:text-white text-slate-900">5.55</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 isDark  text-slate-500 dark:text-slate-400 text-sm">
                        <User className="w-3 h-3" />
                        <span>Lekhok</span>
                      </div>
                    </div>
                  </div>
                  
               
                  <button
                    className="block w-full text-center px-4 py-2   rounded-lg Primary-btn text-slate-400 dark:text-white bg-indigo-600">
                    View Details
                  </button>
        </motion.div>


      </div>
    </div>
  );
};

export default MyOrder;