export default function CategoryCard({ icon, title, count, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-300 transition cursor-pointer hover:shadow-sm">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-slate-900 font-semibold mt-5 text-lg">{title}</h3>

      <p className="text-slate-500 text-sm">{count}</p>
    </div>
  );
}
