import { Navbar } from "@/components"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-100">
      <Navbar />
      {children}
    </div>
  )
}