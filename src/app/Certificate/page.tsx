"use client"
import React from 'react'
import Image from 'next/image'
import certificate from "../../../public/certificate.png"

const printHandler = () => {
    // Open the new window with the certificate URL
    const newWindow = window.open("https://i.ibb.co/Hp6xQYf/certificate.png");
  
    // Check if the new window was opened successfully
    if (newWindow) {
      // Wait until the new window has fully loaded before calling print
      newWindow.onload = () => {
        newWindow.print(); // Call print on the new window
      };
      window.print()
    } else {
      console.error("Failed to open the new window. Popup might be blocked.");
    }
  };
  
  

const Certificate = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-6 bg-black/70 py-8'>
        <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
      </div>
        <h1 className="mt-4 text-black text-2xl font-semibold text-center bg-gradient-to-r from-orange-400 via-white to-green-400 rounded-md min-w-[130px] p-1 px-2">
          Certificate
        </h1>
      <button onClick={printHandler} className='bg-black text-white hover:bg-gray-400 hover:text-black border shadow-md p-2 rounded-md '>
        Download Certificate
      </button>
      <div>
        <Image src={certificate} alt='certificate' width={600} height={600}></Image>
      </div>
    </div>
  )
}

export default Certificate;
