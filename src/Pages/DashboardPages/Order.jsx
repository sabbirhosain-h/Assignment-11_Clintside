import React, { useContext } from 'react';
import useSecure from '../../Hooks/useSecure';
import { Mail, MapPin } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';


const Order = () => {
    
    const secure = useSecure();
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["manageOrder"],
        queryFn: async () => {
            const res = await secure.get("/manageOrder");
            console.log(res.data)
            return res.data;
        },
    });

    const statusMutation = useMutation({
        mutationFn: ({ orderId, newStatus }) =>
            secure.patch(`/manageOrder/${orderId}/status`, { status: newStatus }),
        onMutate: async ({ orderId, newStatus }) => {
            await queryClient.cancelQueries({ queryKey: ["manageOrder"] });
            const prev = queryClient.getQueryData(["manageOrder"]);
            queryClient.setQueryData(["manageOrder"], old =>
                old.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
            );
            return { prev };
        },
        onSuccess: (_, { newStatus }) => {
            toast.success(`Order marked as ${newStatus}`, {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onError: (_, __, ctx) => {
            queryClient.setQueryData(["manageOrder"], ctx.prev);
            toast.error("Failed to update order", { position: "bottom-right" });
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["manageOrder"] }),
    });

    const updateStatus = (orderId, newStatus) =>
        statusMutation.mutate({ orderId, newStatus });

    if (isLoading) return (
        <div className="flex justify-center items-center h-40">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div>
            <h1 className='text-4xl font-bold dark:text-white'>Orders</h1>
            <p className='text-md font-medium text-gray-500'>Manage orders for your books</p>

            <div className='bg-white dark:bg-slate-900 p-4 md:p-10 mt-4 w-full rounded-2xl'>
                <h1 className='font-semibold text-2xl dark:text-white mb-4'>
                    Order Management ({orders.length})
                </h1>

                {/* Desktop */}
                <div className='hidden lg:block overflow-x-auto rounded-t-2xl'>
                    <table className='bg-white dark:bg-slate-900 w-full'>
                        <thead>
                            <tr className="dark:bg-slate-800 bg-slate-100">
                                {["Book", "Customer", "Date", "Status", "Actions"].map(head => (
                                    <th key={head} className="tablehead dark:text-white text-left px-4 py-3">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
                            {orders.map((order, i) => (
                                <motion.tr
                                    key={order._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className='px-4 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <img
                                                className='h-20 w-20 rounded-xl object-cover shrink-0'
                                                src={order.url}
                                                alt={order.BuyerName}
                                            />
                                            <span className='font-medium text-md dark:text-white'>{order.bookName}</span>
                                        </div>
                                    </td>

                                    <td className='px-4 py-4'>
                                        <p className='text-md font-medium dark:text-white'>{order.BuyerName}</p>
                                        <div className='flex items-center gap-1 text-sm text-slate-400 mt-0.5'>
                                            <Mail className='w-3 h-3' />
                                            {order.email}
                                        </div>
                                        <div className='flex items-center gap-1 text-sm text-slate-400 mt-0.5'>
                                            <MapPin  className='w-3 h-3' />
                                            {order.address}
                                        </div>
                                    </td>

                                    <td className='px-4 py-4 text-sm dark:text-white'>
                                        {order.createdAt?.split("T")[0] || "—"}
                                    </td>

                                    <td className='px-4 py-4'>
                                        <StatusBadge status={order.status} />
                                    </td>

                                    <td className='px-4 py-4'>
                                        <ActionButtons
                                            order={order}
                                            onUpdate={updateStatus}
                                            isPending={statusMutation.isPending}
                                        />
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile */}
                <div className='lg:hidden space-y-3'>
                    {orders.map((order, i) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className='border border-slate-100 dark:border-slate-800 rounded-xl p-4'
                        >
                            <div className='flex items-center gap-3 mb-3'>
                                <img
                                    className='h-15 w-15 rounded-xl object-cover shrink-0'
                                    src={order.url}
                                    alt={order.BuyerName}
                                />
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-sm dark:text-white truncate'>{order.BuyerName}</p>
                                    <p className='text-xs text-slate-400'>{order.createdAt?.split("T")[0]}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-1 text-xs text-slate-400 mb-3'>
                                <Mail className='w-3 h-3' />
                                {order.email}
                            </div>

                            <div className='flex items-center gap-2 mb-3'>
                                <StatusBadge status={order.status} />
                            </div>

                            <ActionButtons
                                order={order}
                                onUpdate={updateStatus}
                                isPending={statusMutation.isPending}
                            />
                        </motion.div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <p className='text-center text-slate-400 py-16 text-sm'>No orders yet.</p>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        pending:   "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
        shipping:  "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        delivered: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        cancelled: "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400",
    };
    return (
        <span className={`text-md px-3 py-3 rounded-md font-medium capitalize ${styles[status] || styles.pending}`}>
            {status || "pending"}
        </span>
    );
};

const ActionButtons = ({ order, onUpdate, isPending }) => {
    const { _id, status } = order;

    if (status === "pending") {
        return (
            <div className='flex gap-2 flex-wrap'>
                <button
                    onClick={() => onUpdate(_id, "shipping")}
                    disabled={isPending}
                    className='text-xs px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition disabled:opacity-40'
                >
                    Ship
                </button>
                <button
                    onClick={() => onUpdate(_id, "cancelled")}
                    disabled={isPending}
                    className='text-md px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/30 text-red-500 transition disabled:opacity-40'
                >
                    Cancel
                </button>
            </div>
        );
    }

    if (status === "shipping") {
        return (
            <button
                onClick={() => onUpdate(_id, "delivered")}
                disabled={isPending}
                className='text-xs px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white transition disabled:opacity-40'
            >
                Delivered
            </button>
        );
    }

    return (
        <span className='text-xs text-slate-400 capitalize'>{status}</span>
    );
};

export default Order;