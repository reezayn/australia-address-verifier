// Polyfill global.fetch if not available
if (!global.fetch) {
  // Define a simple mock function. This will be overwritten by our spy.
  global.fetch = jest.fn() as any
}

import { resolvers } from '../lib/schema'

interface Locality {
  location: string
  postcode: number
  state: string
}

interface TestCase {
  state: string
  suburb: string
  postcode: string
  apiResponse: Locality[]
  expected: string
}

const testCases: TestCase[] = [
  {
    state: 'VIC',
    suburb: 'Melbourne',
    postcode: '3000',
    // API returns postcode 3002 for Melbourne, so mismatch error is expected
    apiResponse: [{ location: 'MELBOURNE', postcode: 3002, state: 'VIC' }],
    expected: 'The postcode 3000 does not match the suburb Melbourne.',
  },
  {
    state: 'VIC',
    suburb: 'Ferntree Gully',
    postcode: '3156',
    apiResponse: [{ location: 'FERNTREE GULLY', postcode: 3156, state: 'VIC' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'QLD',
    suburb: 'Brisbane',
    postcode: '4000',
    apiResponse: [{ location: 'BRISBANE', postcode: 4000, state: 'QLD' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'QLD',
    suburb: 'Noosa Heads',
    postcode: '4567',
    apiResponse: [{ location: 'NOOSA HEADS', postcode: 4567, state: 'QLD' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'NSW',
    suburb: 'Broadway',
    postcode: '2007',
    apiResponse: [{ location: 'BROADWAY', postcode: 2007, state: 'NSW' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'NSW',
    suburb: 'Surry Hills',
    postcode: '2010',
    // Simulate no locality found for Surry Hills in NSW
    apiResponse: [],
    expected: 'The suburb Surry Hills does not exist in the state NSW (NSW).',
  },
  {
    state: 'WA',
    suburb: 'Perth',
    postcode: '6000',
    apiResponse: [{ location: 'PERTH', postcode: 6000, state: 'WA' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'WA',
    suburb: 'Fremantle',
    postcode: '6163',
    apiResponse: [{ location: 'FREMANTLE', postcode: 6163, state: 'WA' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'SA',
    suburb: 'Adelaide',
    postcode: '5000',
    apiResponse: [{ location: 'ADELAIDE', postcode: 5000, state: 'SA' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'SA',
    suburb: 'Whyalla',
    postcode: '5600',
    apiResponse: [{ location: 'WHYALLA', postcode: 5600, state: 'SA' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'TAS',
    suburb: 'Hobart',
    postcode: '7000',
    apiResponse: [{ location: 'HOBART', postcode: 7000, state: 'TAS' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
  {
    state: 'TAS',
    suburb: 'Launceston',
    postcode: '7250',
    apiResponse: [{ location: 'LAUNCESTON', postcode: 7250, state: 'TAS' }],
    expected: 'The postcode, suburb, and state input are valid.',
  },
]

// Here we explicitly cast the spy instance to use RequestInfo as the input type.
let fetchSpy = jest
  .spyOn(global, 'fetch')
  // Cast to unknown then to the desired type:
  .mockResolvedValue({
    ok: true,
    json: async () => ({ localities: { locality: [] } }),
  } as unknown as Promise<Response>) as unknown as jest.SpyInstance<
  Promise<Response>,
  [input: RequestInfo, init?: RequestInit | undefined]
>

describe('validateAddress Resolver', () => {
  beforeEach(() => {
    // Reset the spy's implementation before each test.
    fetchSpy.mockClear()
    fetchSpy.mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ localities: { locality: [] } }),
      json: async () => ({ localities: { locality: [] } }),
    } as unknown as Response)
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

  testCases.forEach(({ state, suburb, postcode, apiResponse, expected }) => {
    test(`validateAddress for State: ${state}, Suburb: ${suburb}, Postcode: ${postcode}`, async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        // Provide a text() method that returns the JSON string of the response.
        text: async () =>
          JSON.stringify({ localities: { locality: apiResponse } }),
        // Also provide json() method as before.
        json: async () => ({ localities: { locality: apiResponse } }),
      } as unknown as Response)

      const result = await resolvers.Mutation.validateAddress(null, {
        state,
        suburb,
        postcode,
      })

      expect(result).toBe(expected)
    })
  })
})
