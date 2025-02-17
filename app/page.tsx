import AddressVerifier from '@/components/AddressVerifier'
import ProjectInfo from '@/components/ProjectInfo'

export default function Home() {
  return (
    <div className="min-h-screen w-full p-3 flex flex-col items-center justify-center bg-tangerine relative">
      <AddressVerifier />

      <ProjectInfo />
    </div>
  )
}
