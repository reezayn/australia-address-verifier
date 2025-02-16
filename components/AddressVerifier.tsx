'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { VALIDATE_ADDRESS } from './mutation'

const AddressVerifier = () => {
  const [postcode, setPostcode] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [message, setMessage] = useState('')

  // Initialize the mutation hook.
  const [validateAddress, { loading, error, data }] =
    useMutation(VALIDATE_ADDRESS)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simple client-side validation: all fields must be filled.
    if (!postcode || !suburb || !state) {
      setMessage('All fields are required.')
      return
    }

    try {
      const result = await validateAddress({
        variables: { postcode, suburb, state },
      })

      if (result?.data?.validateAddress) {
        setMessage(result.data.validateAddress)
      } else {
        setMessage('Unexpected error occurred.')
      }
    } catch (err) {
      console.error(err)
      setMessage('Error occurred while validating address.')
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
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
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
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
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
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option value="">Select a state</option>
          <option value="NSW">NSW</option>
          <option value="VIC">VIC</option>
          <option value="QLD">QLD</option>
          <option value="WA">WA</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          {/* <option value="ACT">ACT</option>
          <option value="NT">NT</option> */}
        </select>
      </div>
      {loading && <p className="mb-4 text-blue-500">Validating...</p>}
      {error && <p className="mb-4 text-red-500">Error: {error.message}</p>}
      {message && <p className="mb-4 text-green-500">{message}</p>}
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
