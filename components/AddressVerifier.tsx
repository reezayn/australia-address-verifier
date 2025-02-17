'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { VALIDATE_ADDRESS } from './mutation'
import Link from 'next/link'
import Image from 'next/image'
import useTypewriter from '@/hooks/useTypewriter'

const AddressVerifier = () => {
  const [postcode, setPostcode] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [message, setMessage] = useState('')

  const postcodePlaceholder = useTypewriter({
    words: [
      '2000',
      '2001',
      '3000',
      '3004',
      '4000',
      '4006',
      '5000',
      '5008',
      '6000',
      '6005',
      '7000',
      '7010',
      '0800',
      '0801',
      '2600',
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 1500,
    initialDelay: 3000,
    cycleDelay: 6000,
  })

  const suburbPlaceholder = useTypewriter({
    words: [
      'Bondi',
      'Manly',
      'Surry Hills',
      'St Kilda',
      'Fitzroy',
      'Brunswick',
      'Paddington',
      'Newtown',
      'Glebe',
      'Toorak',
      'Parramatta',
      'Chippendale',
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 1500,
    initialDelay: 3000,
    cycleDelay: 6000,
  })

  // const statePlaceholder = useTypewriter({
  //   words: [
  //     'New South Wales',
  //     'Victoria',
  //     'Queensland',
  //     'South Australia',
  //     'Western Australia',
  //     'Tasmania',
  //     'Northern Territory',
  //     'Australian Capital Territory',
  //   ],
  //   typingSpeed: 100,
  //   deletingSpeed: 50,
  //   pauseTime: 1500,
  //   initialDelay: 3000,
  //   cycleDelay: 6000,
  // })

  const [validateAddress, { loading, error }] = useMutation(VALIDATE_ADDRESS)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

  const renderRightPanelContent = () => {
    if (loading) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Validating</h2>
          <p className="text-black">
            Hang on tight while I verify these for you.
          </p>
        </>
      )
    } else if (error) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Error</h2>
          <p className="text-black">
            {error.message || 'An unexpected error occurred.'}
          </p>
        </>
      )
    } else if (message) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Result</h2>
          <p className="text-black">{message}</p>
        </>
      )
    } else {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">
            Australia Address Verifier
          </h2>
          <p className="text-black">Your result will appear here.</p>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden bg-white">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 flex items-center gap-x-3">
          <div>
            <Image
              src={'/australia.png'}
              alt="Map of Australia"
              className="w-10 pointer-events-none"
              height={40}
              width={40}
            />
          </div>
          {/* <div>Australia</div> */}
          <div>Address Verifier</div>
        </div>
        <form
          data-testid="address-form"
          onSubmit={handleSubmit}
          className="gap-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full px-1">
            <label
              htmlFor="postcode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:ring-0 text-black placeholder:text-black"
              placeholder={postcodePlaceholder || 'Enter postcode'}
              required
            />
          </div>
          <div className="w-full px-1">
            <label
              htmlFor="suburb"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Suburb
            </label>
            <input
              type="text"
              id="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:ring-0 text-black placeholder:text-black"
              placeholder={suburbPlaceholder || 'Enter suburb'}
              required
            />
          </div>
          <div className="w-full px-1">
            <label
              htmlFor="state"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:ring-0 text-black"
              required
            >
              <option value="" className="bg-white text-black">
                {'Select a state'}
              </option>
              <option value="NSW" className="bg-white text-black">
                New South Wales
              </option>
              <option value="VIC" className="bg-white text-black">
                Victoria
              </option>
              <option value="QLD" className="bg-white text-black">
                Queensland
              </option>
              <option value="WA" className="bg-white text-black">
                Western Australia
              </option>
              <option value="SA" className="bg-white text-black">
                South Australia
              </option>
              <option value="TAS" className="bg-white text-black">
                Tasmania
              </option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full mt-4 bg-black text-white py-[10px] rounded-xl font-semibold hover:bg-gray-800 transition-colors ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-x-2 w-full justify-center">
                <div className="h-5 w-5 bg-transparent border-[3px] border-t-tangerine rounded-full animate-spin"></div>
                <div>
                  {' '}
                  {
                    [
                      'Hang tight, mate...',
                      'Hold ya horses...',
                      'Just a tick...',
                      'Hold on, nearly there...',
                      'Wrangling some data...',
                    ][Math.floor(Math.random() * 5)]
                  }
                </div>
              </div>
            ) : (
              'Send Details'
            )}
          </button>

          <div className="text-xs text-gray-400 text-left w-full mt-4 px-1">
            <p className="my-1">
              Please ensure that the address you provided is located in
              Australia.
            </p>
            <p className="my-1">
              <Link href="/examples" className="underline">
                Click here
              </Link>{' '}
              to view sample addresses.
            </p>
          </div>
        </form>
      </div>

      {/* Right Section: Dynamic Message Display */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-2 lg:p-5 lg:pl-0 bg-white">
        <div className="h-full w-full p-3 lg:p-0 flex items-center justify-center lg:min-h-[595px] rounded-3xl bg-peach">
          <div className="text-center max-w-xs">
            {renderRightPanelContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressVerifier
