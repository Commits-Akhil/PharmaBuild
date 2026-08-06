import { Clock3, Check, Truck } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const trackingSteps = [
  {
    title: "Prescription Uploaded",
    status: "Completed",
    desc: "Your prescription has been uploaded successfully.",
    done: true,
  },
  {
    title: "Waiting for Pharmacist Verification",
    status: "Completed",
    desc: "Our pharmacist has received your prescription and is reviewing it.",
    done: true,
  },
  {
    title: "Prescription Approved",
    status: "Completed",
    desc: "Prescription verified successfully. Your order has been approved.",
    done: true,
  },

  {
    title: "Order Placed",
    status: "Completed",
    desc: "Your medicines have been reserved successfully.",
    done: true,
  },
  {
    title: "Packed",
    status: "Completed",
    desc: "Your medicines have been packed and are ready for dispatch.",
    done: true,
  },
  {
    title: "Out For Delivery",
    status: "Current",
    desc: "Delivery partner is on the way to your location.",
    done: true,
  },
  {
    title: "Delivered",
    status: "Pending",
    desc: "Waiting for delivery confirmation.",
    done: false,
  },
];

function Hero() {
  return (
    <section className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-emerald-800 text-xs sm:text-sm font-medium">
        <Truck size={16} />
        Express Chain Delivery
      </div>

      <h1 className="text-slate-900 text-2xl sm:text-4xl md:text-5xl font-bold mt-4 sm:mt-6">
        Order Live Tracking #RX-99412
      </h1>
    </section>
  );
}

function Timeline() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6 sm:mb-10">
        <Clock3 className="text-emerald-700 shrink-0" size={24} />

        <h2 className="text-xl sm:text-3xl font-semibold text-slate-900">
          Live Delivery Progress
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex gap-3.5 sm:gap-5">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                  step.done
                    ? "bg-emerald-500"
                    : step.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-slate-200"
                }`}
              >
                {step.done ? (
                  <Check size={14} className="text-white sm:w-4 sm:h-4" />
                ) : step.status === "Rejected" ? (
                  <span className="text-white text-xs sm:text-sm">✕</span>
                ) : (
                  <span className="text-slate-500 text-xs sm:text-sm">
                    {index + 1}
                  </span>
                )}
              </div>

              {index !== trackingSteps.length - 1 && (
                <div className="w-[2px] h-10 sm:h-12 bg-slate-200" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <h3 className="text-slate-900 text-base sm:text-xl font-semibold">
                  {step.title}
                </h3>

                <span
                  className={`text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-semibold ${
                    step.status === "Completed"
                      ? "bg-emerald-700 text-white"
                      : step.status === "Current"
                        ? "bg-slate-700 text-white"
                        : step.status === "Pending"
                          ? "bg-slate-400 text-white"
                          : "bg-red-600 text-white"
                  }`}
                >
                  {step.status}
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm mt-1 sm:mt-2">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RouteCard() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[30px] h-56 sm:h-[340px] border border-slate-200 flex items-center justify-center p-6 text-center shadow-sm">
      <div>
        <Truck
          size={42}
          className="mx-auto text-emerald-700 sm:w-[50px] sm:h-[50px]"
        />

        <h2 className="text-slate-900 text-xl sm:text-3xl font-semibold mt-4 sm:mt-8">
          Live Delivery Route Active
        </h2>
      </div>
    </div>
  );
}
function DriverCard() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[30px] border border-slate-200 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
            👤
          </div>

          <div>
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">
              Assigned Courier
            </span>
            <h2 className="text-slate-900 text-xl sm:text-2xl font-semibold mt-0.5">
              Michael Miller
            </h2>
          </div>
        </div>

        <div className="w-full sm:w-auto border border-slate-200 bg-slate-50 rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-3.5 sm:py-5 text-center">
          <p className="text-slate-500 text-[10px] sm:text-xs tracking-wider">
            DELIVERY OTP
          </p>

          <h2 className="text-emerald-700 text-3xl sm:text-4xl font-bold mt-1 font-mono">
            4829
          </h2>
        </div>
      </div>

      <button className="w-full mt-5 sm:mt-8 bg-emerald-700 hover:bg-emerald-800 transition py-3 sm:py-4 rounded-xl sm:rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
        📞 Call Delivery Driver
      </button>
    </div>
  );
}

function OrderActions() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 border border-slate-200 shadow-sm">
      <h2 className="text-slate-500 text-xs uppercase tracking-widest mb-4 sm:mb-6">
        Order Actions
      </h2>

      <button className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-600 text-red-400 hover:text-white rounded-xl sm:rounded-full py-3 sm:py-4 font-semibold text-xs sm:text-sm transition">
        Cancel Order
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <Hero />

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.95fr] gap-6 sm:gap-8 mt-6 sm:mt-10">
            <div className="space-y-6 sm:space-y-8">
              <Timeline />

              <DriverCard />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <RouteCard />

              <OrderActions />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
