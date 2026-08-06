import Link from "next/link";
import { Pill } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      <div className="bg-white rounded-[24px] sm:rounded-[35px] px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm text-emerald-800">
             Multi-Branch Smart Pharmacy Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mt-6 sm:mt-8">
            Order Medicines
            <br />
            From Your
            <span className="text-emerald-700">
              {" "}
              Nearest
            </span>
            <br />
            <span className="text-emerald-700">
              Pharmacy
            </span>
          </h1>

          <p className="text-slate-600 mt-4 sm:mt-8 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8">
            Search medicines, upload prescriptions for instant pharmacist
            verification, choose nearby branch stock, and receive guaranteed
            express delivery in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-10">
            <Link href="/medicines" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto justify-center bg-emerald-700 hover:bg-emerald-800 transition px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-semibold flex items-center gap-2 text-sm sm:text-base shadow-sm">
                <Pill size={18} />
                Order Medicines Now
              </button>
            </Link>


          </div>


        </div>

        <div className="mt-4 lg:mt-0">
          <img
            src="doctor.jpeg"
            width={600}
            height={700}
            alt="Doctor"
            className="rounded-[20px] sm:rounded-[30px] object-cover w-full h-[280px] sm:h-[400px] lg:h-[520px] bg-slate-100 border border-slate-200"
          />
        </div>
      </div>
    </section>
  );
}
