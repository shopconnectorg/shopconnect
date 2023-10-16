'use client'

import { Listing } from "@/types"
import { useRouter } from "next/navigation"

export default function Card({id, name, description, price, tags, image}: Listing) {
  const router = useRouter();

  const addToCart = (e:any) => {
    e.stopPropagation();
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart") || "[]"), {id, name, description, price, tags, image}]))
    router.refresh();
  }
    

  return (
    <div className="card w-1/4 bg-base-300 shadow-xl p-4 cursor-pointer hover:scale-105 transition-all" onClick={()=>{router.push(`/item/${id}`)}}>
      <figure className="h-2/3">
        <img className="rounded-xl" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title hover:underline">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end items-center">
          <p>${price}</p>
          <button className="btn btn-primary" onClick={(e)=>{addToCart(e)}}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}