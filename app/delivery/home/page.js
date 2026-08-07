"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  MapPin,
  Building2,
  Phone,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  LogOut,
  ChevronRight,
} from "lucide-react";
import api, { getStoredUser, clearAuth } from "../../lib/api";
import { toast } from "../../components/Toast";

// ─── Status badge helper ──────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    ready_for_pickup: { label: "Ready for Pickup", color: "bg-amber-100 text-amber-800 border-amber-200" },
    out_for_delivery: { label: "Out for Delivery", color: "bg-blue-100 text-blue-800 border-blue-200" },
    delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    pending: { label: "Pending", color: "bg-slate-100 text-slate-600 border-slate-200" },
  };
  const cfg = map[status] || { label: status, color: "bg-slate-100 text-slate-600 border-slate-200" };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

// ─── Available Order Card ─────────────────────────────────────────────────────
function AvailableOrderCard({ order, onClaim, claiming }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-slate-900 text-lg">Order #{order.order_id}</span>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <Building2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">{order.branch_name}</p>
            <p className="text-slate-500">{order.pickup_address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-rose-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">{order.customer_name}</p>
            <p className="text-slate-500">{order.delivery_address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-slate-400 shrink-0" />
          <p>{order.customer_phone || "—"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400 shrink-0" />
          <p>{new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>

      <button
        onClick={() => onClaim(order.order_id)}
        disabled={claiming === order.order_id}
        className="mt-5 w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition flex items-center justify-center gap-2"
      >
        <Truck size={16} />
        {claiming === order.order_id ? "Claiming…" : "Claim Order"}
      </button>
    </div>
  );
}

// ─── My Order Card ────────────────────────────────────────────────────────────
function MyOrderCard({ order, onMarkDelivered, marking }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-slate-900 text-lg">Order #{order.order_id}</span>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <Building2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">{order.branch_name}</p>
            <p className="text-slate-500">{order.pickup_address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-rose-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">{order.customer_name}</p>
            <p className="text-slate-500">{order.delivery_address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-slate-400 shrink-0" />
          <p>{order.customer_phone || "—"}</p>
        </div>
        {order.updated_at && (
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400 shrink-0" />
            <p>Updated: {new Date(order.updated_at).toLocaleString()}</p>
          </div>
        )}
      </div>

      {order.status === "out_for_delivery" && (
        <button
          onClick={() => onMarkDelivered(order.order_id)}
          disabled={marking === order.order_id}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} />
          {marking === order.order_id ? "Marking…" : "Mark as Delivered"}
        </button>
      )}
      {order.status === "delivered" && (
        <div className="mt-5 w-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2">
          <CheckCircle2 size={16} />
          Delivered Successfully
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DeliveryHomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("available"); // "available" | "my-orders"

  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [loadingMy, setLoadingMy] = useState(false);
  const [claiming, setClaiming] = useState(null);   // orderId being claimed
  const [marking, setMarking] = useState(null);     // orderId being marked delivered

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) { router.replace("/Login"); return; }
    if (stored.role !== "delivery_partner") { router.replace("/"); return; }
    setUser(stored);
  }, [router]);

  // ── Fetch available orders ──────────────────────────────────────────────────
  const fetchAvailable = useCallback(async () => {
    setLoadingAvailable(true);
    try {
      const res = await api.get("/delivery/orders/available");
      setAvailableOrders(res.data.data || []);
    } catch (err) {
      toast(err.response?.data?.message || "Failed to load available orders", "error");
    } finally {
      setLoadingAvailable(false);
    }
  }, []);

  // ── Fetch my orders ─────────────────────────────────────────────────────────
  const fetchMyOrders = useCallback(async () => {
    setLoadingMy(true);
    try {
      const res = await api.get("/delivery/orders/my-orders");
      setMyOrders(res.data.data || []);
    } catch (err) {
      toast(err.response?.data?.message || "Failed to load your orders", "error");
    } finally {
      setLoadingMy(false);
    }
  }, []);

  // ── Load data on tab change ─────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    if (tab === "available") fetchAvailable();
    else fetchMyOrders();
  }, [tab, user, fetchAvailable, fetchMyOrders]);

  // ── Claim order ─────────────────────────────────────────────────────────────
  async function handleClaim(orderId) {
    setClaiming(orderId);
    try {
      await api.post(`/delivery/orders/${orderId}/claim`);
      toast("Order claimed! It's now out for delivery.", "success");
      // Remove from available, switch to my orders
      setAvailableOrders((prev) => prev.filter((o) => o.order_id !== orderId));
      setTab("my-orders");
      fetchMyOrders();
    } catch (err) {
      toast(err.response?.data?.message || "Could not claim order", "error");
    } finally {
      setClaiming(null);
    }
  }

  // ── Mark delivered ──────────────────────────────────────────────────────────
  async function handleMarkDelivered(orderId) {
    setMarking(orderId);
    try {
      await api.patch(`/delivery/orders/${orderId}/delivered`);
      toast("Order marked as delivered! 🎉", "success");
      fetchMyOrders();
    } catch (err) {
      toast(err.response?.data?.message || "Could not update order", "error");
    } finally {
      setMarking(null);
    }
  }

  // ── Logout ──────────────────────────────────────────────────────────────────
  function handleLogout() {
    clearAuth();
    router.push("/Login");
  }

  if (!user) return null; // redirect in progress

  const isLoadingCurrent = tab === "available" ? loadingAvailable : loadingMy;
  const currentOrders = tab === "available" ? availableOrders : myOrders;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
              <Truck className="text-amber-700" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Delivery Partner Console</p>
              <p className="text-slate-900 font-bold text-sm">{user.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 text-sm font-medium transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl p-1.5 w-fit mb-8 shadow-sm">
          <button
            onClick={() => setTab("available")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              tab === "available"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Package size={16} />
            Available Orders
            {availableOrders.length > 0 && (
              <span className={`text-xs rounded-full px-2 py-0.5 ${tab === "available" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                {availableOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("my-orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              tab === "my-orders"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Truck size={16} />
            My Orders
            {myOrders.length > 0 && (
              <span className={`text-xs rounded-full px-2 py-0.5 ${tab === "my-orders" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`}>
                {myOrders.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Section Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {tab === "available" ? "Available Orders" : "My Active Orders"}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {tab === "available"
                ? "Orders ready for pickup at the pharmacy branch."
                : "Orders you have claimed and are handling."}
            </p>
          </div>
          <button
            onClick={tab === "available" ? fetchAvailable : fetchMyOrders}
            disabled={isLoadingCurrent}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            <RefreshCw size={15} className={isLoadingCurrent ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* ── Content ── */}
        {isLoadingCurrent ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 h-64 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
                <div className="h-3 bg-slate-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-2/3 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <AlertCircle className="text-slate-400" size={28} />
            </div>
            <p className="text-slate-700 font-semibold text-lg">No orders found</p>
            <p className="text-slate-500 text-sm mt-2">
              {tab === "available"
                ? "No unclaimed orders are ready for pickup right now. Check back soon!"
                : "You haven't claimed any orders yet."}
            </p>
            {tab === "available" && (
              <button
                onClick={fetchAvailable}
                className="mt-6 flex items-center gap-2 text-emerald-700 font-semibold text-sm border border-emerald-200 bg-emerald-50 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition"
              >
                <RefreshCw size={15} />
                Check Again
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tab === "available"
              ? availableOrders.map((order) => (
                  <AvailableOrderCard
                    key={order.order_id}
                    order={order}
                    onClaim={handleClaim}
                    claiming={claiming}
                  />
                ))
              : myOrders.map((order) => (
                  <MyOrderCard
                    key={order.order_id}
                    order={order}
                    onMarkDelivered={handleMarkDelivered}
                    marking={marking}
                  />
                ))}
          </div>
        )}
      </main>
    </div>
  );
}
