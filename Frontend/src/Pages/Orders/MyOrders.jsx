import React, { useContext, useState, useEffect } from "react";
import styles from "./myOrder.module.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { URl, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        URl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className={styles.myorders}>
      <h2>My Orders</h2>

      <div className={styles.container}>
        {data.map((order, index) => (
          <div key={index} className={styles.myordersOrder}>
            <img src={assets.parcel_icon} alt="" />

            {/* Items */}
            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? item.name + " x " + item.quantity
                  : item.name + " x " + item.quantity + ", "
              )}
            </p>

            {/* Amount */}
            <p>₹{order.amount}.00</p>

            {/* Item count */}
            <p>Items: {order.items.length}</p>

            {/* ✅ STATUS (FIXED + COLORED) */}
            <p>
              <span>&#x25cf;</span>{" "}
              <b
                style={{
                  color:
                    order.status === "preparing"
                      ? "orange"
                      : order.status === "out_for_delivery"
                      ? "blue"
                      : "green"
                }}
              >
                {order.status === "preparing" &&
                  "Food is getting ready 🍳"}
                {order.status === "out_for_delivery" &&
                  "Out for delivery 🚚"}
                {order.status === "delivered" && "Delivered ✅"}
              </b>
            </p>

            {/* Refresh button */}
            <button onClick={fetchOrders}>
              Refresh Status 🔄
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
