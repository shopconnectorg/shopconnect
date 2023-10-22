'use client'

import { useRouter } from "next/navigation"
import Link from "next/link";
import { useCart } from "../app/template";
import { useContext } from "react";
import type { Item } from '../src/types';
import { useStore } from "@/src/store";

type CardProps = {
  item: Item;
}

export default function Card({ item }: CardProps) {
  const { id, name, price, image } = item;
  const addToCart = useStore((state) => state.addToCart);

  const discounts = useStore((state) => state.discounts);
  const discountItem = discounts.find((discount) => discount.itemId === id);
  const discount = discountItem ? discountItem.percentage / 100 : 0;

  return (
    <Link key={id} href={`/item/${id}`}  className="group cursor-pointer">
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
        <button className="btn btn-xs" onClick={(e)=>{ e.preventDefault(); addToCart(item); }}>Add to Cart</button>
      </div>  
    </Link>
  )
}
