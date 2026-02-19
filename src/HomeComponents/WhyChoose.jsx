/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "motion/react"
import { BookOpen, Clock, Shield, Truck } from 'lucide-react';


const WhyChoose = () => {
    const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your books delivered within 2-3 business days',
    },
    {
      icon: Shield,
      title: 'Secure Service',
      description: 'Safe and reliable delivery with tracking',
    },
    {
      icon: Clock,
      title: 'Flexible Returns',
      description: 'Easy return process at your convenience',
    },
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access to thousands of books from multiple libraries',
    },
  ];
    return (
        <section className="py-16 bg-grey-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Why Choose BookCourier?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make reading accessible, convenient, and enjoyable for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center px-2 py-4 bg-white dark:bg-black/20 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-amber-50 dark:bg-gray-500">
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                  <p className="text-black dark:text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
};

export default WhyChoose;