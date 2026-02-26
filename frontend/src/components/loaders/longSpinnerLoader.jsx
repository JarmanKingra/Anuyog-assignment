export default function ButtonSpinner({ text = "Loading..." }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      <span className="text-sm font-medium">{text}</span>
    </span>
  );
}


