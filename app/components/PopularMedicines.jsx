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
    otc: false,
    },
    {
      image: "/medicine2.jpg",
      name: "Metformin Hydrochloride",
      company: "Metformin Sustained Release",
      category: "Diabetes",
      price: "1225",
      oldPrice: "1500",
    otc: false,
    },
    {
      image: "/medicine3.jpg",
      name: "Vitamin D3 60000 IU",
      company: "Cholecalciferol",
      category: "Wellness",
      price: "999",
      oldPrice: "1100",
    otc: true,
    },
    {
      image: "/medicine4.jpg",
      name: "Atorvastatin Calcium",
      company: "Atorvastatin",
      category: "Prescription",
      price: "1580",
      oldPrice: "1950",
    otc: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-10">



      <div className="grid md:grid-cols-4 gap-8">

        {medicines.map((item, index) => (
          <MedicineCard key={index} {...item} />
        ))}

      </div>

    </section>
  );
}