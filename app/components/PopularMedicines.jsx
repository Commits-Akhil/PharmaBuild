import MedicineCard from "./MedicineCard";

export default function PopularMedicines() {

  const medicines = [
    {
      image: "/medicine1.jpg",
      name: "Amoxicillin & Potassium",
      company: "Amoxicillin + Clavulanic Acid",
      category: "Prescription",
      price: "1850",
      oldPrice: "2200",
      discount: "16% OFF",
    },
    {
      image: "/medicine2.jpg",
      name: "Metformin Hydrochloride",
      company: "Metformin Sustained Release",
      category: "Diabetes",
      price: "1225",
      oldPrice: "1500",
      discount: "13% OFF",
    },
    {
      image: "/medicine3.jpg",
      name: "Vitamin D3 60000 IU",
      company: "Cholecalciferol",
      category: "Wellness",
      price: "999",
      oldPrice: "1100",
      discount: "23% OFF",
    },
    {
      image: "/medicine4.jpg",
      name: "Atorvastatin Calcium",
      company: "Atorvastatin",
      category: "Prescription",
      price: "1580",
      oldPrice: "1950",
      discount: "19% OFF",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-bold text-white">
            Popular Medicines
          </h2>

          <p className="text-gray-400 mt-2">
            Frequently ordered medicines across RxConnect.
          </p>

        </div>

        <button className="text-green-500 hover:text-green-600 hover:scale-90 transition-transform">
          View Catalogue →
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-8">

        {medicines.map((item, index) => (
          <MedicineCard key={index} {...item} />
        ))}

      </div>

    </section>
  );
}