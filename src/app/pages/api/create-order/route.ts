
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    
    // Parse the incoming request body to get the user-defined amount
    const body = await request.json();
    const amount = body.amount; // Amount is expected in paise (smallest currency unit)

    // Validate amount (must be greater than zero)
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 } // Bad Request
      );
    }

    // Create a new order with the given amount
    const order = await razorpay.orders.create({
      amount, // Use the dynamic amount from the request (already in paise)
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    
    return NextResponse.json({ orderId: order.id }, { status: 200 });
    
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Error in creating order" }, { status: 500 });
  }
}
