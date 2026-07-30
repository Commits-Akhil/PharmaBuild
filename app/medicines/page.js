import MedicineSearch from "../components/MedicineSearch";
import FilterBar from "../components/FilterBar";
import PopularMedicines from "../components/PopularMedicines";
import Header from "../components/header";
import Footer from "../components/footer";

export default function MedicinesPage() {
  return (<>
  <Header/>
    <div className="bg-[#0B1220] min-h-screen">
      <div className="max-w-7xl mx-auto py-10">
        <MedicineSearch />

        <FilterBar />

        <PopularMedicines />
      </div>
    </div>
    <Footer/>
    </>
  );
}
