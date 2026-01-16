import React from 'react'

export default function LoginSkelton() {
  return <>
  <div role="status" class="flex flex-col  space-y-2 max-w-md  mx-auto p-5 shadow-lg dark:bg-gray-800 rounded-xl animate-pulse  ">
    <div class="h-5 bg-gray-900 rounded-md w-1/2 mx-auto mb-4"></div>
    
    <div class="space-y-2">
        <div class="h-3 bg-gray-900 rounded w-1/4"></div>
        <div class="h-10 bg-gray-900 rounded-lg  w-full"></div>
    </div>
    
    <div class="space-y-2">
        <div class="h-3 bg-gray-900 rounded w-1/4"></div>
        <div class="h-10 bg-gray-900 rounded-lg  w-full"></div>
    </div>

    <div class="h-10 bg-gray-900 rounded-lg w-full mt-2"></div>
    
    <div class="h-3 bg-gray-900 rounded w-1/3 mx-auto mt-2"></div>

    <span class="sr-only">Loading...</span>
</div>
  </>
}
