import Typewriter from '@/components/Typewriter'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="max-w-3xl px-3 lg:px-2 py-10 mx-auto text-white">
      <Link href={`/`} className="text-tangerine ml-5 my-6 group text-lg">
        <span className="text-2xl mr-3"> ⃪ </span>
        <span className="group-hover:underline">Back to Home</span>
      </Link>
      <h1 className="flex flex-col text-6xl font-extrabold gap-3 my-3">
        <p>About</p>
        <p>
          <span className="text-tangerine">Australia</span> Address Verifier
        </p>
      </h1>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-4xl font-bold text-tangerine">
            Project Overview
          </h2>
          <p className="mt-4 text-lg">
            This project is a simple tool that verifies Australian addresses. It
            allows you to enter a postcode, suburb, and state and checks if the
            address is valid using data from the Australia Post API.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-tangerine">Features</h2>
          <ul className="mt-4 list-disc list-inside text-lg">
            <li>User-friendly form to capture postcode, suburb, and state.</li>
            <li>Validates addresses through a secure GraphQL proxy.</li>
            <li>
              Returns clear success or error messages based on the validation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-tangerine">Built With</h2>
          <ul className="mt-4 list-disc list-inside text-lg">
            <li>Next.js 15 (with the new App Router)</li>
            <li>React &amp; TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Apollo Client &amp; Apollo Server</li>
            <li>GraphQL</li>
            <li>Jest &amp; React Testing Library</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-tangerine">Contact</h2>
          <p className="mt-4 text-lg">
            Developed by Rijan Shrestha. If you have any questions, feel free to
            reach out at{' '}
            <a
              className="text-tangerine underline"
              href="mailto:rijancodes@gmail.com"
            >
              rijancodes@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export default page
