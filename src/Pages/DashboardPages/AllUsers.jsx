import { motion } from 'motion/react';
import React from 'react';
import useSecure from '../../Hooks/useSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; 

const AllUsers = () => {
    const secure = useSecure();
    const queryClient = useQueryClient();

    const { data: allUsers = [] } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await secure.get("/users");
            return res.data;
        },
    });

    const roleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            await secure.patch(`/users/${userId}/role`, { role: newRole });
            return { userId, newRole };
        },
        onMutate: async ({ userId, newRole }) => {
            await queryClient.cancelQueries({ queryKey: ["allUsers"] });
            const previous = queryClient.getQueryData(["allUsers"]);
            queryClient.setQueryData(["allUsers"], (old) =>
                old.map(u => u._id === userId ? { ...u, role: newRole } : u)
            );
            return { previous };
        },
      
        onSuccess: (_, { newRole }) => {
            toast.success(`Role updated to ${newRole}`, {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(["allUsers"], context.previous);
            console.error("Role update failed:", err);
            
            toast.error("Failed to update role. Please try again.", {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
    });

    const getRoleButtons = (user) => {
        const all = [
            { label: "Make Admin", role: "admin", color: "bg-indigo-600 hover:bg-indigo-700" },
            { label: "Make Librarian", role: "librarian", color: "bg-amber-500 hover:bg-amber-600" },
            { label: "Make User", role: "user", color: "bg-slate-500 hover:bg-slate-600" },
        ];
        return all.filter(btn => btn.role !== (user.role || "user"));
    };

    return (
        <div>
            <h1 className='text-4xl font-bold dark:text-white'>All Users</h1>
            <p className='text-md font-medium text-gray-500'>Manage user accounts and roles</p>

            <div className='bg-white dark:bg-slate-900 p-4 md:p-10 mt-4 w-full rounded-2xl'>
                <h1 className='font-semibold text-2xl dark:text-white mb-4'>User Management ({allUsers.length})</h1>

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto rounded-t-2xl">
                    <table className='bg-white dark:bg-slate-900 w-full'>
                        <thead>
                            <tr className="dark:bg-slate-800 bg-slate-100">
                                {["User", "Email", "Current Role", "Action"].map((head) => (
                                    <th key={head} className="tablehead dark:text-white text-left px-4 py-3">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
                            {allUsers.map((user, i) => (
                                <motion.tr
                                    key={user._id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                className='h-10 w-10 rounded-xl object-cover shrink-0'
                                                src={user.url}
                                                alt={user.username}
                                            />
                                            <span className='font-medium dark:text-white'>{user.username}</span>
                                        </div>
                                    </td>
                                   <td className='px-4 py-3 text-gray-600 dark:text-gray-300'>{user.email}</td>
                                    <td className='px-4 py-3'>
                                        <RoleBadge role={user.role || "user"} />
                                    </td>
                                    <td className='px-4 py-3'>
                                        <div className='flex gap-2 flex-wrap'>
                                            {getRoleButtons(user).map(btn => (
                                                <button
                                                    key={btn.role}
                                                    onClick={() => roleMutation.mutate({ userId: user._id, newRole: btn.role })}
                                                    disabled={roleMutation.isPending}
                                                    className={`px-3 py-1.5 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${btn.color}`}
                                                >
                                                    {btn.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className='lg:hidden space-y-3'>
                    {allUsers.map((user, i) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className='border border-slate-200 dark:border-slate-700 rounded-xl p-4'
                        >
                            <div className='flex items-center gap-3 mb-3'>
                                <img
                                    className='h-12 w-12 rounded-xl object-cover shrink-0'
                                    src={user.url}
                                    alt={user.username}
                                />
                                <div>
                                    <p className='font-semibold dark:text-white'>{user.username}</p>
                                    <p className='text-sm text-gray-500 dark:text-gray-400 break-all'>{user.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <span className='text-sm text-slate-400'>Role:</span>
                                <RoleBadge role={user.role || "user"} />
                            </div>
                            <div className='flex gap-2 flex-wrap'>
                                {getRoleButtons(user).map(btn => (
                                    <button
                                        key={btn.role}
                                        onClick={() => roleMutation.mutate({ userId: user._id, newRole: btn.role })}
                                        disabled={roleMutation.isPending}
                                        className={`px-3 py-1.5 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${btn.color}`}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {allUsers.length === 0 && (
                    <p className='text-center text-slate-400 py-10'>No users found.</p>
                )}
            </div>
        </div>
    );
};

const RoleBadge = ({ role }) => {
    const styles = {
        admin: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
        librarian: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
        user: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    };
    return (
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${styles[role] || styles.user}`}>
            {role}
        </span>
    );
};

export default AllUsers;