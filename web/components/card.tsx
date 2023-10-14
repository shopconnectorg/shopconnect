'use client'

import { Listing } from "@/types"
import { useRouter } from "next/navigation"

export default function Card({id, name, description, price, tags, image}: Listing) {
  const router = useRouter();

  return (
    <div className="card w-1/4 bg-base-200 shadow-xl p-4">
      <figure className="h-2/3">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end items-center">
          <p>{price}</p>
          <button className="btn btn-primary" onClick={()=>{router.push(`/item/${id}`)}}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}