import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { VALIDATE_ADDRESS } from '@/components/mutation'
import AddressVerifier from '@/components/AddressVerifier'

const mocks: MockedResponse[] = [
  {
    request: {
      query: VALIDATE_ADDRESS,
      variables: { postcode: '2007', suburb: 'Broadway', state: 'NSW' },
    },
    result: {
      data: {
        validateAddress: 'The postcode, suburb, and state input are valid.',
      },
    },
  },
]

describe('AddressForm Component', () => {
  test('renders form fields', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddressVerifier />
      </MockedProvider>
    )
    expect(screen.getByLabelText(/Postcode/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Suburb/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
  })

  test('shows validation error when fields are empty', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddressVerifier />
      </MockedProvider>
    )
    // Use the test id on the form to trigger submission.
    const form = screen.getByTestId('address-form')
    fireEvent.submit(form)
    expect(
      await screen.findByText(/All fields are required./i)
    ).toBeInTheDocument()
  })

  test('displays success message on valid submission', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddressVerifier />
      </MockedProvider>
    )

    fireEvent.change(screen.getByLabelText(/Postcode/i), {
      target: { value: '2007' },
    })
    fireEvent.change(screen.getByLabelText(/Suburb/i), {
      target: { value: 'Broadway' },
    })
    fireEvent.change(screen.getByLabelText(/State/i), {
      target: { value: 'NSW' },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/The postcode, suburb, and state input are valid./i)
      ).toBeInTheDocument()
    })
  })
})
