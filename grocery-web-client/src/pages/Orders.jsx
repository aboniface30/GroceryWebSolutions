import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../actions/axiosInstance";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-2">Order #{order.id}</h2>
            <p className="text-gray-700 mb-2">
              Placed at {new Date(order.placed_at).toLocaleDateString()}
            </p>
            <ul>
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <img
                    src={item.product.imageLink}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.product.name}</h3>
                    <p>{item.product.description}</p>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="text-right mt-4 text-teal-600">
              Payment Status:{" "}
              {order.payment_status === "P" ? "Pending" : "Paid"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;

