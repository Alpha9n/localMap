'use client'

import { MapRenderComponent } from "@/components/GoogleMaps"
import { LocationListComponent } from "@/components/LocationList"

export default function Home() {
  return (
    <main className="h-5/6 md:py-10">
      <div className="mx-auto w-full h-full md:w-5/6 md:flex md:bg-foreground-200 md:rounded-xl">
        <div className="h-4/5 w-full md:h-full md:w-4/6 md:rounded-xl overflow-hidden items-center">
          <MapRenderComponent/>
        </div>
        <div className="min-h-1/5 p-4 flex gap-4 overflow-x-scroll overflow-y-hidden h-fit md:h-full md:grid md:content-start md:w-2/6 md:min-w-fit md:overflow-y-scroll md:overflow-x-hidden">
          <LocationListComponent listTag={"pilgrimagePlace"}/>
        </div>
      </div>
    </main>
  )
}
