"use client";
import { Building2, Minus, Plus, Trash2 } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import BranchSection from "../components/BranchSection";
import PrescriptionPopup from "../components/PrescriptionPopup";

import { useState } from "react";


const cartItems = [
  {
    id: 1,
    image: "https://picsum.photos/100?1",
    name: "Amoxicillin & Potassium Clavulanate 625mg",
    category: "Prescription",
    price: "$18.50",
    quantity: 1,
  },
  {
    id: 2,
    image: "https://picsum.photos/100?2",
    name: "Vitamin D3 60,000 IU Softgels (Pack of 4)",
    category: "Wellness",
    price: "$19.98",
    quantity: 2,
  },
];

function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-[#1A2341] rounded-[30px] p-10">
      <h1 className="text-5xl font-bold text-white">
        Shopping Cart & Order Summary
      </h1>
    </section>
  );
}

function CartItem({ item }) {
  return (
    <div className="flex justify-between  p-6 border-b border-white/10">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-2xl object-cover"
        />

        <div>
          <h2 className="text-white text-xl font-semibold max-w-sm">
            {item.name}
          </h2>

          <p className="text-gray-400 mt-1">{item.category}</p>

          <p className="text-white mt-2 font-semibold">{item.price} / unit</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center bg-[#24314C] rounded-full px-4 py-2 gap-5">
          <button>
            <Minus size={18} className="text-gray-400" />
          </button>

          <span className="text-white font-semibold">{item.quantity}</span>

          <button>
            <Plus size={18} className="text-gray-400" />
          </button>
        </div>

        <h2 className="text-white text-2xl font-semibold">{item.price}</h2>

        <button>
          <Trash2 className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

function OrderSummary({ setShowPopup }) {
  return (
    <div className="bg-[#161F33] rounded-[30px] p-10 h-fit">
      <h2 className="text-4xl font-bold text-white">Order Summary</h2>

      <hr className="my-10 border-white/10" />

      <div className="space-y-5">
        <div className="flex justify-between text-lg">
          <span className="text-gray-300">Subtotal:</span>

          <span className="text-white font-semibold">$38.48</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="text-gray-300">Branch Express Delivery:</span>

          <span className="text-emerald-400 font-semibold">FREE</span>
        </div>
      </div>

      <hr className="my-8 border-white/10" />

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Total Payable:</h2>

        <h2 className="text-3xl font-bold text-green-500">$38.48</h2>
      </div>

      <button
  onClick={() => setShowPopup(true)}
  className="mt-10 w-full bg-blue-600 hover:bg-blue-700 transition py-5 rounded-full text-white text-xl font-semibold"
>
  Proceed to Checkout →
</button>
    </div>
  );
}

export default function Page() {
      const [showPopup, setShowPopup] = useState(false);

  return (<>
   <PrescriptionPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
  <Header/>

    <div className="bg-[#0B1220] min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Hero />

        <div className="grid lg:grid-cols-[1.45fr_1fr] gap-8 mt-10">
          <div>
            <div className=" bg-[#161F33] rounded-[30px] overflow-hidden border border-white/10">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <OrderSummary  setShowPopup={setShowPopup}  />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
