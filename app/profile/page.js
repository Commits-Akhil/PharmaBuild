import Header from "../components/header";
import Footer from "../components/footer";
export default function ProfilePage() {
  return (<>
  <Header/>
    <div className="bg-[#0B1220] min-h-screen p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-green-500 rounded-3xl p-8 flex items-center gap-6">
          <img
            src="https://i.pravatar.cc"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />

          <div>
            <h1 className="text-4xl font-bold">Eleanor Vance</h1>

            <p className="text-gray-200 mt-1">
              eleanor.vance@healthnet.com • Patient ID #CUST-9021
            </p>

            <div className="flex gap-3 mt-4">
              <span className="bg-green-600 px-4 py-1 rounded-full text-sm">
                Verified Patient
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 bg-[#161F33] rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">
              Personal Information
            </h2>

            <label className="block mb-2">Full Name</label>

            <input
              className="w-full bg-[#263149] p-4 rounded-xl mb-6 outline-none"
              defaultValue="Eleanor Vance"
            />

            <label className="block mb-2">Phone Number</label>

            <input
              className="w-full bg-[#263149] p-4 rounded-xl mb-6 outline-none"
              defaultValue="+91 1234567890"
            />

            <label className="block mb-2">Default Delivery Address</label>

            <textarea
              rows="4"
              className="w-full bg-[#263149] p-4 rounded-xl outline-none"
              defaultValue="742 Evergreen Terrace, Apt 4B, Central City, CA 90210"
            />

            <button className="mt-8 bg-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-700">
              Save Profile Details
            </button>
          </div>

          <div className="space-y-8">
            <div className="bg-[#161F33] rounded-3xl p-6">
              <h3 className="text-gray-400 uppercase text-sm">
                Appearance & Vault
              </h3>

              <div className="flex justify-between items-center mt-8">
                <span>Dark Theme Mode</span>

                <button className="w-12 h-12 rounded-full bg-[#263149]">
                  🌙
                </button>
              </div>

              <button className="mt-8 w-full bg-green-500 py-3 rounded-xl">
                Open Prescription Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
