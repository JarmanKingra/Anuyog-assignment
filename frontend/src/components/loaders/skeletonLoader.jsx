export default function SkeletonLoader() {
  return (
    <div className="relative w-[120px] h-[20px] rounded-lg bg-[#2c2c2c] overflow-hidden shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
      <div className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0)_100%)] animate-[shimmer_1s_infinite] skew-x-[-20deg]" />
    </div>
  );
}