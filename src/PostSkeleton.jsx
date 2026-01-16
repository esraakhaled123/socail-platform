export default function PostSkeleton() {
  return (
    <div
  role="status"
  className="p-4  rounded-lg shadow-sm animate-pulse my-3 md:p-6 bg-gray-800"
>
  {/* User Info Section */}
  <div className="flex items-center py-2">
    <div className="w-10 h-10 bg-gray-900 rounded-full mr-3"></div>
    <div className="flex-1">
      <div className="h-2.5 bg-gray-900 rounded-full w-32 mb-2"></div>
      <div className="h-2 bg-gray-900 rounded-full w-24"></div>
    </div>
  </div>

  {/* Content (Text lines) */}
  <div className="space-y-3 mb-4 mt-2">
    <div className="h-2 bg-gray-900 rounded-full w-full"></div>
    <div className="h-2 bg-gray-900 rounded-full w-5/6"></div>
  </div>

  {/* Media Placeholder (Empty Box without Icon) */}
  <div className="h-48 bg-gray-900 rounded-lg mb-4 w-full"></div>

  {/* Footer Title */}
  <div className="h-3 bg-gray-900 rounded-full w-1/4 mb-2"></div>

  <span className="sr-only">Loading Post...</span>
</div>
  )
}
