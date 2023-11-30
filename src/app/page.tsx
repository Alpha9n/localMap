'use client'

import { MapRenderComponent } from "@/components/GoogleMaps"

export default function Home() {
  return (
    <main className="h-5/6 md:py-10">
      <div className="mx-auto w-full h-full md:w-5/6 md:flex">
        <div className="w-full h-full md:w-4/6 md:rounded-xl overflow-hidden items-center">
          <MapRenderComponent/>
        </div>
        <div className="hidden h-full p-4 md:block md:w-2/6">
          test
        </div>
      </div>
    </main>
  )
}
