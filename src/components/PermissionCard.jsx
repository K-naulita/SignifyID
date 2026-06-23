export default function PermissionCard({
  title,
  desc,
  icon,
  enabled,
  onToggle
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">

        <div className="w-10 h-10 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#0A3D91]">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-sm text-slate-800">
            {title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 leading-snug">
            {desc}
          </p>
        </div>

      </div>

      {/* TOGGLE */}
      <button
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
          enabled ? "bg-[#0A3D91]" : "bg-slate-300"
        }`}
      >
        <div
          className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

    </div>
  );
}