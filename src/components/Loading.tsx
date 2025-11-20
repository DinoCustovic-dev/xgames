export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gaming-purple-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gaming-purple-neon text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

