import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: {
        type: String,
        required: true,
      },

      image: {
        type: String,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1
      },
    },
  ],
 //shipping address
  shippingAddress: { 
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  paymentMethod: {
    type: String,
    enum: ["cod", "stripe", "paypal","cash_on_delivery"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },

  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },

  paidAt: Date,
  deliveredAt: Date,
},
{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;