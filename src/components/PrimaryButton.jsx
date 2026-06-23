export default function PrimaryButton({
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-14 rounded-2xl font-semibold text-white
      bg-[#013485] hover:opacity-90 transition"
    >
      {text}
    </button>
  );
}