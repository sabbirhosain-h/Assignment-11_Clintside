import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { Link } from 'react-router';

const Statestics = () => {
    return (
         <section>
        <div className=" mx-auto px-4 bg-blue-600 py-10 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">10K+</h1>
              <p className="text-black/80 dark:text-white">Books Available</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">5K+</h1>
              <p className="text-black/80 dark:text-white">Happy Readers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">50+</h1>
              <p className="text-black/80 dark:text-white">Partner Libraries</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">98%</h1>
              <p className="text-black/80 dark:text-white">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>

        <div className="py-16 bg-grey-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl dark:text-white font-bold mb-4">Ready to Start Reading?</h2>
            <p className="text-black/80 dark:text-white text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of book lovers who trust BookCourier for their reading needs
            </p>
            <div className="flex gap-4 justify-center">
                <Link to="/register" className="Primary-btn text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Get Started
                </Link>
                <Link to="/books" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
                  Browse Books
                </Link>
            </div>
          </motion.div>
        </div>
      </div>
      </section>
    );
};

export default Statestics;