import { Search, Eye, RotateCcw } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const orders = [
  {
    id: "RX-99412",
    status: "Delivered",
    date: "Today, 11:30 AM",
    branch: "RxConnect Central - Healthcare Hub",
    medicines:
      "Amoxicillin & Potassium Clavulanate 625mg, Vitamin D3 60,000 IU Softgels (Pack of 4)",
    items: 2,
    total: "$34.64",
    reason: "",
  },
  {
    id: "RX-88120",
    status: "Delivered",
    date: "24 Jul 2026, 09:10 AM",
    branch: "RxConnect Central - Healthcare Hub",
    medicines:
      "Paracetamol & Caffeine Extra Fast Relief, Cetirizine Hydrochloride 10mg",
    items: 2,
    total: "$18.61",
    reason: "",
  },
  {
    id: "RX-77104",
    status: "Delivered",
    date: "10 Jul 2026, 04:15 PM",
    branch: "RxConnect Westside Pharmacy",
    medicines: "Metformin Hydrochloride SR 500mg",
    items: 1,
    total: "$33.08",
    reason: "",
  },
  {
    id: "RX-65018",
    status: "Rejected",
    date: "28 Jul 2026, 02:45 PM",
    branch: "RxConnect North Care Express",
    medicines: "Azithromycin 500mg Tablets",
    items: 1,
    total: "$12.50",
    reason:
      "Prescription image is blurred and the doctor's signature is not clearly visible. Please upload a clearer prescription.",
  },
];

function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-[#1A2341] rounded-[32px] px-10 py-10">
      <h1 className="text-5xl font-bold text-white">
        Order History & Reorders
      </h1>

      <p className="text-gray-300 mt-4 text-lg">
        View past medicine deliveries, download tax invoices, or re-order in
        1-click.
      </p>
    </section>
  );
}

function SearchBar() {
  return (
    <div className="bg-[#161F33] rounded-[28px] px-6 py-5 mt-8 border border-white/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="relative w-full lg:w-[360px]">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search order #, medicine name..."
            className="w-full bg-[#24314C] rounded-full py-3 pl-12 pr-4 outline-none text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-6 text-gray-300">
          <span>Status:</span>

          <button className="bg-green-600 px-4 py-1 rounded-lg text-white">
            All
          </button>

          <button>Delivered</button>


          <button>Rejected</button>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="bg-[#161F33] rounded-[28px] border border-white/10 p-7 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">
            Order #{order.id}
          </h2>

          <span
            className={`text-white text-xs px-3 py-1 rounded-full ${
              order.status === "Delivered"
                ? "bg-green-700"
                  : order.status === "Rejected"
                    ? "bg-red-600"
                    : "bg-gray-600"
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="text-gray-400 mt-3">
          {order.date} • Branch:
          <span className="text-white font-medium"> {order.branch}</span>
        </p>

        {order.status === "Rejected" && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-red-400 font-semibold">Rejected by Pharmacist</p>

            <p className="text-gray-300 mt-2">
              <span className="font-semibold text-white">Reason:</span>{" "}
              {order.reason}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-gray-400">Total Paid</p>

          <h2 className="text-4xl font-bold text-white">{order.total}</h2>
        </div>

        <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
          <Eye className="text-white" size={18} />
        </button>


      </div>
    </div>
  );
}

export default function OrderHistoryPage() {
  return (
    <>
      <Header />
      <div className="bg-[#0B1220] min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <Hero />

          <SearchBar />

          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
