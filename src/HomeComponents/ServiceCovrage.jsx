/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "motion/react"
import { MapPin } from 'lucide-react';

function ServiceCovrage() {
    const cities = [
        { name: 'Dhaka', books: 1240 },
        { name: 'Rajshahi', books: 980 },
        { name: 'Chittagong', books: 750 },
        { name: 'Khulna', books: 620 },
        { name: 'Sylhet', books: 540 },
        { name: 'Barishal', books: 680 },
    ];
    return (
        <section className="py-16 bg-muted dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Coverage</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We deliver books to major cities across the country
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {cities.map((city, index) => (
                        <motion.div
                            key={city.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-center hover:shadow-lg transition-shadow">
                                <div className="px-4 py-6 bg-white rounded-lg dark:bg-gray-700">
                                    <MapPin className="h-8 w-8 mx-auto mb-2 text-black" />
                                    <h3 className="font-semibold mb-1 dark:text-white">{city.name}</h3>
                                    <p className="text-sm text-muted-foreground dark:text-white">{city.books} books</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>  
            </div>
        </section>
    );
}

export default ServiceCovrage;