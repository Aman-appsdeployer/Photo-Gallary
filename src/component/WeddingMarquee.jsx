
export default function WeddingMarquee() {
  return (
    <div className="py-6 bg-rose-100 dark:bg-gray-700 overflow-hidden">
      <marquee
        behavior="scroll"
        direction="left"
        scrollamount="8"
        className="text-2xl font-semibold text-rose-600 dark:text-rose-300 tracking-wide"
      >
        💍 Wedding Moments • ❤️ Love Stories • 📸 Candid Photography • 🌸 Pre-Wedding Shoots • 🎥 Cinematic Films •
      </marquee>
    </div>
  );
}
