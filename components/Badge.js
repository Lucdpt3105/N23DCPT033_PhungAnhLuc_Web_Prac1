export default function Badge({ label, color = "indigo" }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    dark: "bg-zinc-900 text-white border-zinc-900",
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <span
      className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${selectedColor}`}
    >
      {label}
    </span>
  );
}
