"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutEzzifly = () => {
  return (
    <section className="bg-white py-16">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="overflow-hidden rounded-2xl shadow-md">
          <Image
            src="/images/plane.jpg"
            alt="Ezzifly Airplane"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto mt-10 px-6 text-center md:text-left"
      >
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          About Ezzifly
        </h3>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-snug">
          Making Flight Booking Simple and Stress-Free
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Ezzifly is a modern flight booking platform designed to make travel
          easier, faster, and more affordable. We connect travellers with top
          airlines worldwide, giving you the power to search, compare, and book
          flights with just a few clicks. Our goal is simple — to help you reach
          your destination without the stress of complicated booking processes.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Founded with a vision to transform how people travel, Ezzifly was
          built on the belief that booking a flight should be as effortless as
          choosing your destination. We leverage cutting-edge technology and
          smart design to give every traveller a smooth, transparent, and
          enjoyable experience.
        </p>
        <a
          href="#"
          className="text-red-500 font-semibold hover:underline hover:text-red-600 transition-colors"
        >
          Read More
        </a>
      </motion.div>
    </section>
  );
};

export default AboutEzzifly;
