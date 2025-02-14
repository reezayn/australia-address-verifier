'use client'
import { useState } from 'react'

const AddressVerifier = () => {
  const [postcode, setPostcode] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!postcode || !suburb || !state) {
      setMessage('All fields are required.')
      return
    }
  }

  return (
    <form
      data-testid="address-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <div className="mb-4">
        <label htmlFor="postcode" className="block text-gray-700 font-medium">
          Postcode
        </label>
        <input
          type="text"
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder='e.g. "2000"'
          className="mt-1 text-black block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="suburb" className="block text-gray-700 font-medium">
          Suburb
        </label>
        <input
          type="text"
          id="suburb"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          placeholder='e.g. "Sydney"'
          className="mt-1 text-black block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block text-gray-700 font-medium">
          State
        </label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 text-black block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option value="">Select a state</option>
          <option value="NSW">NSW</option>
          <option value="VIC">VIC</option>
          <option value="QLD">QLD</option>
          <option value="WA">WA</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  )
}

export default AddressVerifier
