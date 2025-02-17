import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="max-w-3xl py-10 mx-auto text-white">
      <Link href={`/`} className="text-tangerine ml-5 my-6 group text-lg">
        <span className="text-2xl mr-3"> ⃪ </span>
        <span className="group-hover:underline">Back to Home</span>
      </Link>
      <h1 className="flex flex-col text-6xl font-extrabold gap-3 my-3">
        Example Addresses
      </h1>
      <p className="text-lg mb-6">
        Use these valid addresses as a guide when entering your own details.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 1</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 2007
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Broadway
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> NSW
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 2</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 4000
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Brisbane
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> QLD
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 3</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 6000
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Perth
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> WA
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 4</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 5000
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Adelaide
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> SA
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 5</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 7000
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Hobart
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> TAS
          </p>
        </div>

        {/* Additional Examples */}
        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 6</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 3000
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Melbourne
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> VIC
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 7</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 3156
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Ferntree Gully
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> VIC
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 8</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 4567
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Noosa Heads
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> QLD
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 9</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 2010
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Surry Hills
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> NSW
          </p>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <h2 className="text-2xl font-bold text-tangerine">Example 10</h2>
          <p className="text-lg">
            <span className="font-semibold">Postcode:</span> 6163
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suburb:</span> Fremantle
          </p>
          <p className="text-lg">
            <span className="font-semibold">State:</span> WA
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
