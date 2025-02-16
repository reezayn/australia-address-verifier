import AddressVerifier from '@/components/AddressVerifier'

export default function Home() {
  return (
    <div className="min-h-screen w-full p-3 flex flex-col items-center justify-center bg-tangerine relative">
      <AddressVerifier />
    </div>
  )
}
