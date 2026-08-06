import BranchSection from "../components/BranchSection";
import Header from "../components/header";
import Footer from "../components/footer";

export default function BranchesPage() {
  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-10 sm:py-10 border border-slate-200 shadow-sm">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium">
              Multi-Branch Inventory Locator
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-4 sm:mt-6">
              RxConnect Pharmacy Branches
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 max-w-3xl leading-relaxed">
              Choose your primary branch to optimize delivery speed and verify
              local medicine availability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-8 mt-6 sm:mt-8">
            <div className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-slate-200 flex flex-col max-h-[550px] lg:max-h-[720px] shadow-sm">
              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-xs sm:text-sm tracking-widest text-slate-500 uppercase font-semibold">
                  Available Branches
                </h2>
              </div>

              <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
                <BranchSection singleColumn={true} />
              </div>
            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden h-[350px] sm:h-[450px] lg:h-[720px] border border-slate-200 shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Mangaluru&t=k&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                title="Pharmacy Branch Map View"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
