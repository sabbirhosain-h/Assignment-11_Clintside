import React from 'react';
import { motion } from "motion/react"
import { Star, User } from 'lucide-react';

const MyOrder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-bold dark:text-white"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Orders
      </motion.h1>
      <motion.p
        className="text-md font-medium text-gray-500"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Books You want to Order
      </motion.p>

      <motion.div
        className="mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 w-full min-h-screen"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <motion.h1
          className="text-md font-medium dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          My Order History
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block rounded-t-2xl  mt-4  sm:max-h-80 max-h-55"
        >
          <table className="rounded-t-2xl bg-white dark:bg-slate-900 w-full">

            <motion.thead
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <tr className="dark:bg-slate-800">
                {["Book", "Order Date", "Price", "Status", "Payment", "Action"].map((head, i) => (
                  <motion.th
                    key={head}
                    className="tablehead dark:text-white"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    {head}
                  </motion.th>
                ))}
              </tr>
            </motion.thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">

              <motion.tr
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ backgroundColor: "rgba(241,245,249,0.5)", scale: 1.005 }}
                layout={false}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {/* Book */}
                <td className="px-4 py-3 flex items-center gap-4">
                  <motion.img
                    className="w-14 h-20 object-cover rounded"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
                    alt="book"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    whileHover={{ scale: 1.08 }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    <h1 className="font-medium dark:text-white">
                      By Elena Storm
                    </h1>
                    <p className="text-sm text-gray-500">
                      Fiction Novel
                    </p>
                  </motion.div>
                </td>

                {/* Order Date */}
                <motion.td
                  className="px-4 py-3 text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  25 Feb 2026
                </motion.td>

                {/* Price */}
                <motion.td
                  className="px-4 py-3 font-medium dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  ৳450
                </motion.td>

                {/* Status */}
                <motion.td
                  className="px-4 py-3"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                >
                  <span className="px-3 py-1 text-sm rounded-full bg-green-700 text-white">
                    Delivered
                  </span>
                </motion.td>

                {/* Payment */}
                <motion.td
                  className="px-4 py-3"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.95, type: "spring", stiffness: 200 }}>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white">
                    Paid
                  </span>
                </motion.td>

                {/* Action */}
                <motion.td
                  className="px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}>
                  <motion.button
                    className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
                    whileHover={{ scale: 1.08, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}
                    whileTap={{ scale: 0.95 }} >
                    View
                  </motion.button>
                </motion.td>

              </motion.tr>

            </tbody>
          </table>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-4 lg:hidden">
          <div className="flex gap-4 mb-3">

            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
              className="w-20 h-28 object-cover rounded"
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.65, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            />

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="mb-1 isDark dark:text-white  text-slate-900">
                Boi er nam
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                by Boi er lekhok
              </p>
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="px-2 py-1 rounded text-sm isDark text-white   bg-blue-600">
                  Horror
                </span>

                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 1.2, duration: 0.6, repeat: 0 }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                  <span className="text-sm isDark  dark:text-white text-slate-900">5.55</span>
                </div>
              </motion.div>
              <div className="flex items-center gap-1 isDark  text-slate-500 dark:text-slate-400 text-sm">
                <User className="w-3 h-3" />
                <span>Lekhok</span>
              </div>
            </motion.div>
          </div>


          <motion.button
            className="block w-full text-center px-4 py-2   rounded-lg Primary-btn text-slate-400 dark:text-white bg-indigo-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Details
          </motion.button>
        </motion.div>


      </motion.div>
    </motion.div>
  );
};

export default MyOrder;