'use client'
import listings from '../../../data/mockListings.json'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { cartContext } from "../../template";

export default function Page({params} : {params: {id: string}}) {
  const { cart, setCart } = useContext(cartContext)!;
  const router = useRouter();
  const listing = listings.find(listing => listing.id === Number(params.id))

  useEffect(() => {
    console.log(listing)
  }, [listing])

  const addToCart = (e:any) => {
    e.stopPropagation();
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart") || "[]"), listing]))
    setCart([...JSON.parse(localStorage.getItem("cart") as string), listing])
  }

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
            <button className="btn btn-primary" onClick={(e) => {addToCart(e)}}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}