/* eslint-disable @next/next/no-img-element */
'use client'

import { Listing, CardProps } from "@/types"
import { useRouter } from "next/navigation"
import Link from "next/link";
import { useCart } from "../app/template";
import { useContext } from "react";

export default function Card(props : CardProps) {
  const router = useRouter();
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart)
  const { id, name, description, price, tags, image } = props.listing;
  const discount = props.discount || 0;

  const addToCart = (e:any) => {
    e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = cartItems.findIndex((item: any) => item.id === id);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push({id, name, description, price, tags, image, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCart(cartItems);
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
        {
          discount > 0 ?
            <div>
              <div className="flex flex-row gap-2">
                <p className="mt-1 text-lg font-medium line-through">${price}</p>
                <p className="mt-1 text-lg font-medium text-red-500">-{discount * 100}%</p>
              </div>
              <p className="mt-1 text-lg font-medium">${(price - (price * discount)).toFixed(2)}</p> 
            </div>
            : 
            <p className="mt-1 text-lg font-medium">${price}</p>
        }
        <button className="btn btn-xs" onClick={(e)=>addToCart(e)}>Add to Cart</button>
      </div>  
    </a>
  )
}
