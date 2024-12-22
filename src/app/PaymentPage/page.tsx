"use client";
import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const [amount, setAmount] = useState(0); // Initialize with a default amount
  const [isProcessing, setIsProcessing] = useState(false);
  const  router = useRouter();
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Send request to create an order on your backend
      const response = await fetch("/pages/api/create-order", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }) // Convert to paise
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      
      
      const data = await response.json();
      console.log("Order data:", data);

      // Initialize Razorpay with options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key from environment variable
        amount: amount * 100, // Convert amount to smallest currency unit (in paise for INR)
        name: "Sainik Mitra",
        description: "Test Transaction",
        order_id: data.orderId, // Order ID created by your backend
        handler: function (response: any) {
          console.log("Payment successful", response);
          router.push("/Certificate")
        },
        prefill: {
          name: "Siddhesh Patole",
          email: "sprp@gmail.com",
          contact: "876633333",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Check if Razorpay script is loaded and open Razorpay payment modal
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        throw new Error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500/50 rounded-md text-black">
      {/* Load Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="p-6 bg-gray-500/50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contribute Here</h1>

        {/* Input field for user to enter amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1" // Minimum amount should be 1
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter amount in INR"
        />

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
