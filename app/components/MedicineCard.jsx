import Image from "next/image";

export default function MedicineCard({
  image,
  name,
  category,
  company,
  price,
  oldPrice,
  otc,
}) {
  return (
    <div className="bg-[#141B2D] rounded-3xl overflow-hidden border border-gray-700 hover:border-green-500 transition hover:scale-102">
      <div className="relative">
        <Image
          src={image}
          width={400}
          height={250}
          alt={name}
          className="w-full h-35 object-cover"
        />

        <span
          className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs text-white ${
            otc ? "bg-green-600" : "bg-orange-500"
          }`}
        >
          {otc ? "OTC" : "Rx Required"}
        </span>

        {/* <span className="absolute bottom-3 right-3 bg-green-400 text-xs px-3 py-1 rounded-full text-gray-800">
          {discount}
        </span> */}
      </div>

      <div className="p-5">
        <p className="text-gray-400 uppercase text-xs">{category}</p>

        <h3 className="text-white font-semibold text-lg mt-2">{name}</h3>

        <p className="text-gray-400 text-sm">{company}</p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-white text-2xl font-bold">₹{price}</span>

            <span className="text-gray-500 line-through ml-2">₹{oldPrice}</span>
          </div>

          <button className="bg-green-500 px-5 py-2 rounded-xl text-white hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
