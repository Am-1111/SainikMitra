"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/ui/images-slider";

export default function ImagesSliderDemo() {
  const images = [
    "/imgslider/imgslider1.avif",
    "/imgslider/imgslider2.avif",
    "/imgslider/imgslider3.avif",
  ];
  return (
    <ImagesSlider className="h-[30rem] sm:h-[25rem] md:h-[30rem] w-full opacity-95  mb-4" images={images}>
      <motion.div
        initial={{
          opacity: 0, 
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 "
      >
        
        
      </motion.div>
    </ImagesSlider>
  );
}
