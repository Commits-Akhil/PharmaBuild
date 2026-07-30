"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../adminComponents/navbar";
import StatCard from "../adminComponents/statcard";
import BranchCard from "../adminComponents/branchcard";
import OrdersTable from "../adminComponents/ordertable";
import UsersTable from "../adminComponents/usertable";

export default function AdminPage() {
  const [branches, setBranches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  const fetchData = async () => {
    try {
      const branchRes = await axios.get("/api/branches");
      const orderRes = await axios.get("/api/orders");
      const userRes = await axios.get("/api/users");

      setBranches(branchRes.data.branches);
      setOrders(orderRes.data.orders);
      setUsers(userRes.data.users);
      setFetchFailed(false);
    } catch (err) {
      setFetchFailed(true);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 120000);

    return () => clearInterval(interval);
  }, []);

  const pendingVerification = orders.filter(
    (order) => order.verification_status === "Pending",
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <div
          id="dashboard"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
        >
          <StatCard title="Total Branches" value={branches.length} />

          <StatCard title="Total Orders" value={orders.length} />

          <StatCard title="Total Users" value={users.length} />

          <StatCard title="Pending Verification" value={pendingVerification} />
        </div>

        {fetchFailed && (
          <div className="mb-8 rounded-xl bg-red-50 px-4 py-3 text-red-600 font-medium">
            fetch failed
          </div>
        )}

        <div id="branches">
          <h2 className="text-2xl font-semibold mb-5">Branch Overview</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                orders={orders}
                fetchFailed={fetchFailed}
              />
            ))}
          </div>
        </div>

        <div id="orders" className="mt-10">
          <OrdersTable orders={orders} fetchFailed={fetchFailed} />
        </div>

        <div id="users" className="mt-10">
          <UsersTable users={users} fetchFailed={fetchFailed} />
        </div>
      </div>
    </div>
  );
}
