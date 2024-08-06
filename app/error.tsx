'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col py-5 justify-center items-center h-screen gap-5">
      <h2 className='font-extrabold'>Something went wrong!</h2>
      <button
      className='bg-blue-500 text-white w-auto px-4 py-2 rounded-md'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <a href='/' className='text-black w-auto px-4 py-2 border-2 border-blue-500 rounded-md'>Go to Homepage</a>

    </div>
  )
}