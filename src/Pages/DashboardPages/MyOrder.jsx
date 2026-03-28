import React, { useContext, useEffect, useState } from 'react';
import { motion } from "motion/react"
import useAPIs from '../../Hooks/useAPIs';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useSecure from '../../Hooks/useSecure';

const MyOrder = () => {
  const instance = useAPIs();
  const secure = useSecure();
  const { user } = useContext(AuthContext);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getAllOrderData = async () => {
    try {
      const res = await secure.get("/MyOrders", { params: { e: user.email } });
      setAllOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.email) getAllOrderData();
  }, [user?.email, location.key]);

  const cancelOrder = async (orderId) => {
    try {
      await secure.patch(`/payment/cancel/${orderId}`);
      toast("Order Cancled!", {
            duration: 4000,
            position: "bottom-right",
            style: { background: '#1e293b',   color: '#fff'  },
          }) 
      getAllOrderData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayNow = (id) => navigate(`/Payment/${id}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold dark:text-white">My Orders</h1>
      <p className="text-md font-medium text-gray-500">Books You want to Order</p>

      

      { 
        allOrders.length === 0 ? 
        ( 
          <div className='mt-5 dark:bg-slate-900 bg-white rounded-2xl py-40 w-full gap-y-4 flex flex-col justify-center items-center'>
            <h1 className='text-slate-500 font-medium'>You haven't placed any orders yet</h1>
            <Link to={"/Books"}>
            <button className='px-3 py-2 bg-blue-700 text-white rounded-xl'>
              Browse Books
            </button>
            </Link>
         </div>
         ) 
        : 
        (
          <motion.div
        className="mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 w-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}>
        <h1 className="text-md font-medium dark:text-white">My Order History</h1>

        {/* Desktop Table */}
        <div className="hidden lg:block rounded-t-2xl mt-4 overflow-y-auto overflow-x-hidden max-h-screen">
          <table className="rounded-t-2xl bg-white dark:bg-slate-900 w-full">
            <thead>
              <tr className="dark:bg-slate-800">
                {["Book", "Order Date", "Price", "Status", "Payment", "Action"].map((head) => (
                  <th key={head} className="tablehead dark:text-white">{head}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {allOrders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {/* Book */}
                  <td className="px-4 py-3 flex items-center gap-4">
                    <img className="w-14 h-20 object-cover rounded" src={order.url} alt="book" />
                    <div>
                      <h1 className="font-medium dark:text-white">By {order.author}</h1>
                      <p className="text-sm text-gray-500">{order.bookName}</p>
                    </div>
                  </td>

                  {/* Order Date */}
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 font-medium dark:text-white">{order.price}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-sm rounded-full text-white ${order.status === "pending" ? "bg-green-700" : "bg-red-600"}`}>
                      {order.status === "pending" ? "Pending" : "Canceled"}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-sm rounded-full text-white ${order.payment === "Paid" ? "bg-green-500" : "bg-blue-600"}`}>
                      {order.payment}
                    </span>
                  </td>

                  {/* Action */}
                  {order.status === "canceled" ? (
                    <td className="px-4 py-3"></td>
                  ) : (
                    <td className="px-4 py-3 gap-2">
                      {order.payment !== "Paid" && (
                        <motion.button
                          onClick={() => handlePayNow(order.bookId)}
                          className="px-4 py-2 text-sm rounded-lg bg-blue-800 text-white hover:bg-blue-600 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Pay Now
                        </motion.button>
                      )}
                      {order.payment !== "Paid" && (
                        <motion.button
                          onClick={() => cancelOrder(order._id)}
                          className="ml-3 px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel
                        </motion.button>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-4 mt-4 lg:hidden">
          {allOrders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 flex flex-col gap-3 shadow-sm"
            >
              {/* Top row */}
              <div className="flex items-center gap-4">
                <img src={order.url} alt="book" className="w-14 h-20 object-cover rounded-xl shadow" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-white truncate">{order.bookName}</p>
                  <p className="text-sm text-gray-500 truncate">By {order.author}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
                <p className="font-bold text-slate-800 dark:text-white text-lg shrink-0">{order.price}</p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 text-xs rounded-full font-medium text-white ${order.status === "pending" ? "bg-green-600" : "bg-red-500"}`}>
                  {order.status === "pending" ? "Pending" : "Canceled"}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full font-medium text-white ${order.payment === "Paid" ? "bg-green-600" : "bg-blue-600"}`}>
                  {order.payment}
                </span>
              </div>

              {/* Action buttons */}
              {order.status !== "canceled" && order.payment !== "Paid" && (
                <div className="flex gap-2 mt-1">
                  <motion.button
                    onClick={() => handlePayNow(order.bookId)}
                    className="flex-1 py-2 text-sm rounded-xl bg-blue-800 text-white hover:bg-blue-600 transition font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Pay Now
                  </motion.button>
                  <motion.button
                    onClick={() => cancelOrder(order._id)}
                    className="flex-1 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-500 transition font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

          </motion.div>
        )
      }

    </motion.div>
  );
};

export default MyOrder;