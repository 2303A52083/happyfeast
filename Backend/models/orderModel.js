import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },

    // 🔥 FIXED STATUS
    status: {
        type: String,
        enum: ["preparing", "out_for_delivery", "delivered"],
        default: "preparing"
    },

    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel
