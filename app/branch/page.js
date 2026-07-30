"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function BranchPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReason, setShowReason] = useState({});
  const [reason, setReason] = useState({});

  async function fetchOrders() {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/YOUR_GET_API");

      setOrders(res.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!loading && orders.length === 0) {
      fetchOrders();
    }
  }, [orders]);

  async function approveOrder(orderId) {
    try {
      await axios.post("http://localhost:5000/YOUR_POST_API", {
        order_id: orderId,
        ans: "yes",
        reason: null,
      });

      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (err) {
      console.log(err);
    }
  }

  async function rejectOrder(orderId) {
    if (!reason[orderId]) {
      alert("Please enter a reason.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/YOUR_POST_API", {
        order_id: orderId,
        ans: "no",
        reason: reason[orderId],
      });

      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Pending Prescription Orders</h1>

      {orders.length === 0 ? (
        <p className="text-lg">No Pending Orders</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order #{order.order_id}
              </h2>

              <p>
                <span className="font-medium">Customer :</span>{" "}
                {order.customer_name}
              </p>

              <img
                src={order.prescription_image}
                alt="Prescription"
                className="w-full h-80 object-contain border rounded-lg mt-5"
              />

              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => approveOrder(order.order_id)}
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  Yes
                </button>

                <button
                  onClick={() =>
                    setShowReason({
                      ...showReason,
                      [order.order_id]: true,
                    })
                  }
                  className="bg-red-600 text-white px-5 py-2 rounded"
                >
                  No
                </button>
              </div>

              {showReason[order.order_id] && (
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Enter reason"
                    value={reason[order.order_id] || ""}
                    onChange={(e) =>
                      setReason({
                        ...reason,
                        [order.order_id]: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                  />

                  <button
                    onClick={() => rejectOrder(order.order_id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
