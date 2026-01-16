export default function PostSkeleton() {
  return (
    <div
      role="status"
      className="p-4 border border-gray-600 rounded-lg shadow-sm animate-pulse my-3 opacity-80 md:p-6 bg-gray-500"
    >
      {/* User */}
      <div className="flex items-center py-2">
        <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
        <div>
          <div className="h-2.5 bg-gray-700 rounded-full w-32 mb-2"></div>
          <div className="h-2 bg-gray-700 rounded-full w-24"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <div className="h-2 bg-gray-700 rounded-full w-full"></div>
        <div className="h-2 bg-gray-700 rounded-full w-5/6"></div>
      </div>

      {/* Image / Media */}
      <div className="flex items-center justify-center h-40 bg-gray-700 rounded-lg mb-4">
        <svg
          className="w-10 h-10 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
          />
        </svg>
      </div>

      {/* Title */}
      <div className="h-3 bg-gray-700 rounded-full w-1/3 mb-4"></div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}
