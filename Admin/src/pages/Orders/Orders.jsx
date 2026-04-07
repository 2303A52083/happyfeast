import React from 'react'
import './orders.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from "../../assets/assets"

const Orders = ({ URl }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(URl + "/api/order/list")
      if (response.data.success) {
        setOrders(response.data.data || [])
      } else {
        toast.error(response.data.message || "Error fetching orders")
      }
    } catch (error) {
      console.error("Order Fetch Failed:", error.message);
      toast.error("Connectivity Issue: Check Console");
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(URl + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders?.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items?.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ","
                  }
                })}
              </p>
              <p className='order-item-name'>
                {
                  order.address ? order.address.firstName + " " + order.address.lastName : "Unknown User"
                }
              </p>
              <div className="order-item-address">
                <p>{order.address ? order.address.street + "," : "No Address"}</p>
                <p>{order.address ? order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode : ""}</p>
              </div>
              <p className="order-item-phone">{order.address?.phone || "No Phone"}</p>
            </div>
            <p>Items : {order.items ? order.items.length : 0}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status}>
             <option value="Food is Getting Ready!">Food is Getting Ready!</option>
             <option value="Out for delivery">Out for delivery</option>
             <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
