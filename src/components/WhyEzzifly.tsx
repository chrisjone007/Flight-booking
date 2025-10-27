"use client";

import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { FaTags, FaClock, FaPlane, FaUsers } from "react-icons/fa";

interface Feature {
  id: number;
  icon: ReactElement;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <FaTags className="text-pink-500 text-5xl" />,
    title: "Best Flight Deals",
    description:
      "Get unbeatable prices on domestic and international flights — no hidden fees, just transparent fares.",
  },
  {
    id: 2,
    icon: <FaClock className="text-red-500 text-5xl" />,
    title: "Real-Time Availability",
    description:
      "Search, compare, and book flights in real time with live seat and fare updates.",
  },
  {
    id: 3,
    icon: <FaPlane className="text-blue-500 text-5xl" />,
    title: "Simple & Fast Booking",
    description:
      "Book your flight in just a few clicks with our smooth, intuitive interface.",
  },
  {
    id: 4,
    icon: <FaUsers className="text-yellow-500 text-5xl" />,
    title: "Trusted by Thousands",
    description:
      "Join thousands of satisfied travellers who trust Ezzifly to get them to their destination hassle-free.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const WhyEzzifly: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Ezzifly
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer transition-all"
            >
              <div className="flex justify-center md:justify-start mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEzzifly;
