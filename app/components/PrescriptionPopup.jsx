import { Upload, ShieldCheck } from "lucide-react";
import BranchSection from "./BranchSection";

export default function PrescriptionPopup({ showPopup, setShowPopup }) {
  if (!showPopup) return null;
  const branches = [
    {
      id: 1,
      name: "RxConnect Central - Healthcare Hub",
      location: "MG Road, Bengaluru",
      address: "12 MG Road, Bengaluru, Karnataka - 560001",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "RxConnect Westside Pharmacy",
      location: "Rajajinagar, Bengaluru",
      address: "45 West Park Road, Rajajinagar, Bengaluru - 560010",
      phone: "+91 98765 43211",
    },
    {
      id: 3,
      name: "RxConnect North Care Express",
      location: "Hebbal, Bengaluru",
      address: "78 Bellary Road, Hebbal, Bengaluru - 560024",
      phone: "+91 98765 43212",
    },
    {
      id: 4,
      name: "RxConnect Downtown Wellness Center",
      location: "Koramangala, Bengaluru",
      address: "22 80 Feet Road, Koramangala, Bengaluru - 560034",
      phone: "+91 98765 43213",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#161F33] w-full max-w-2xl rounded-3xl p-8 border border-white/10 relative">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-5 right-5 text-gray-400 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold text-white flex items-center gap-3">
          <Upload className="text-blue-500" />
          Upload Prescription
        </h2>

        <div className="border-2 border-dashed border-gray-600 rounded-3xl mt-8 h-[230px] flex flex-col justify-center items-center">
          <div className="bg-blue-900 p-5 rounded-3xl">
            <Upload className="text-blue-500" size={40} />
          </div>

          <p className="text-white text-lg font-semibold mt-6">
            Click or Drag Prescription Here
          </p>

          <p className="text-gray-400 mt-2">PDF, JPG, PNG (Max 15MB)</p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="mt-6 text-white"
          />
        </div>

        <div className="mt-8">
          <label className="text-white block mb-3">Select Branch</label>

          <select className="w-full bg-[#111B2F] border border-gray-700 rounded-xl p-4 text-white">
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} • {branch.location}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            alert("Prescription Submitted Successfully");
            setShowPopup(false);
          }}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-full text-white font-semibold flex justify-center items-center gap-2"
        >
          <ShieldCheck size={20} />
          Submit for Pharmacist Verification
        </button>
      </div>
    </div>
  );
}
