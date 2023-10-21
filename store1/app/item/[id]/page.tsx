'use client'
import listings from '../../../data/mockListings.json'
import { useRouter } from 'next/navigation'

export default function Page({params} : {params: {id: string}}) {
  const router = useRouter();
  const listing = listings.find(listing => listing.id === Number(params.id))

  return (
    <div className="hero min-h-screen">
      <div className="hero-content items-start flex-row h-full" style={{maxHeight:"80%"}}>
        <img src={listing?.image} className="h-full rounded-lg shadow-2xl" />
        <div className="flex justify-between flex-col h-full">
          <div>
            <h1 className="text-5xl font-bold">{listing?.name}</h1>
            <p className="py-4">
              {listing?.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-6 justify-end">
            <p className="text-3xl font-bold">${listing?.price}</p>
            <button className="btn btn-primary" onClick={() => {}}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
