import React, { useContext } from "react";
import { motion } from "motion/react";
import { Heart, Star, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAPIs from "../../Hooks/useAPIs";
import { AuthContext } from "../../Context/AuthProvider";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const instance = useAPIs();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: wishList = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(`/MyWishlist?email=${user.email}`);
      return res.data;
    },
  });


  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      return instance.delete(`/Wishlist/remove/${bookId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", user.email]);
      toast("Removed from Wishlist", {
        duration: 2000,
        position: "bottom-right",
        style: { background: "#1e293b", color: "#fff" },
      });
    },
    onError: () => {
      toast("Failed to remove", {
        duration: 2000,
        position: "bottom-right",
        style: { background: "#ff0000", color: "#fff" },
      });
    },
  });


  return (
    <div>
      <h1 className="text-4xl font-bold dark:text-white">My Wishlist</h1>
      <p className="text-md font-medium text-gray-500">
        Books you want to read later
      </p>

      {wishList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 mt-4 w-full h-[calc(90vh-64px)] rounded-2xl flex flex-col justify-center items-center">
          <Heart className="h-20 w-20 text-slate-500" />
          <p className="text-lg mt-4 dark:text-slate-400">
            No book added to wishlist yet
          </p>
          <Link to="/Books">
            <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-xl">
              Browse Books
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          {wishList.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl"
            >
              <div className="flex gap-5 mb-3">
                <img
                  src={book.url}
                  className="w-24 h-32 object-cover rounded"
                />

                <div>
                  <h3 className="text-2xl dark:text-white">
                    {book.bookName}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    by {book.author}
                  </p>

                  <div className="flex items-center gap-2 my-2">
                    <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm">
                      {book.genra}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="dark:text-white">
                      {book.rating}
                    </span>
                  </div>

                  <p className="text-xl dark:text-white">
                    ৳ {book.price}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/Details/${book._id}`)}
                  className="flex-1 Primary-btn text-white rounded-lg py-2"
                >
                  View Details
                </button>

                <button
                  onClick={() => removeMutation.mutate(book._id)}
                  disabled={removeMutation.isLoading}
                  className="bg-red-600 text-white px-3 rounded-lg disabled:opacity-50"
                >
                  <X />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
