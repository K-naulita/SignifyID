export default function InputField({
  type = "text",
  placeholder,
  icon,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-14 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-700"
      />

      {icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  );
}