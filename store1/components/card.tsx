'use client'

import { Listing } from "@/types"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Card({id, name, description, price, tags, image}: Listing) {
  const router = useRouter();

  const addToCart = (e:any) => {
    e.stopPropagation();
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart") || "[]"), {id, name, description, price, tags, image}]))
    router.refresh();
  }
    

  return (
    <a key={id} onClick={()=>router.push(`/item/${id}`)} className="group cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm">{name}</h3>
      <div className="flex justify-between">
        <p className="mt-1 text-lg font-medium">{price}</p>
        <button className="btn btn-xs" onClick={(e)=>addToCart(e)}>Add to Cart</button>
      </div>  
    </a>
  )
}