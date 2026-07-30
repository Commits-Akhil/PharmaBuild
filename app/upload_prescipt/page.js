import { Upload, ShieldCheck } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

function UploadPrescription() {
  return (
    <div className="bg-[#161F33] rounded-[30px] p-8 border border-white/10">

      <h2 className="text-3xl font-semibold text-white flex items-center gap-3">
        <Upload className="text-blue-500" />
        Upload Prescription Document
      </h2>

      <div className="border-2 border-dashed border-gray-600 rounded-3xl mt-8 h-[260px] flex flex-col items-center justify-center">

        <div className="bg-blue-900 p-6 rounded-3xl">
          <Upload className="text-blue-500" size={40} />
        </div>

        <p className="text-white text-xl font-semibold mt-8">
          Click or drag doctor prescription file here
        </p>

        <p className="text-gray-400 mt-2">
          Supports PDF, JPEG, PNG scans up to 15MB
        </p>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="mt-6 text-white"
        />

      </div>

      <div className="mt-8">

        <label className="text-white block mb-3 font-medium">
          Select Available Branch
        </label>

        <select className="w-full bg-[#111B2F] border border-gray-700 rounded-xl p-4 text-white outline-none">

          <option>RxConnect Central - Healthcare Hub</option>
          <option>RxConnect Westside Pharmacy</option>
          <option>RxConnect North Care Express</option>
          <option>RxConnect Downtown Wellness Center</option>

        </select>

      </div>

      <button className="mt-8 w-full bg-blue-700 hover:bg-blue-800 transition rounded-full py-5 text-white text-lg font-semibold flex items-center justify-center gap-2">

        <ShieldCheck size={20} />

        Submit for Pharmacist Verification

      </button>

    </div>
  );
}

export default function Page() {
  return (<>
  <Header/>
    <div className="bg-[#0B1220] min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <UploadPrescription/>
      </div>
    </div>
    <Footer/>
    </>
  );
}
