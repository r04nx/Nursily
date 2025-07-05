export default function VoiceAssistantLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div className="p-4 bg-white/60 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] p-3 bg-gray-200 rounded-2xl animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
