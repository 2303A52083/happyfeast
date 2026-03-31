import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing user order
const placeOrder = async (req,res) => {

    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const amountInPaise = Math.round(req.body.amount * 100);

        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: newOrder._id.toString()
        };

        const order = await razorpay.orders.create(options);
        console.log("Razorpay Order Created:", order.id)

        res.json({success:true, order: order})
    } catch(error){
        console.error("Place Order Error:", error)
        res.json({success: false,message: error.message || "Payment Initialization Failed"})
    }
}

const verifyOrder = async (req, res)=>{
    const {orderId, success, razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    try {
        if (success==="true" || success===true) {
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            if(expectedSignature === razorpay_signature) {
                await orderModel.findByIdAndUpdate(orderId, {payment:true})
                res.json({success: true, message: "Paid"})
            } else {
                res.json({success: false, message: "Invalid Signature"})
            }
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// user Orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


// All orders for Admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Error"})
    }
}


// Update Order Status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success: true,message: "Status Updated!"})
    } catch (error) {
            console.log(error);
            res.json({success:false,message: "Error"})
            
    }
}

export { placeOrder, verifyOrder, userOrders, updateStatus, listOrders }