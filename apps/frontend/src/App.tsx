import './index.css'
import { Button } from "@/components/ui/button"

function App() {

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Travel Planner</h1>
      <Button children="Create a Trip" variant="outline"/>
    </main>
  )
}

export default App
