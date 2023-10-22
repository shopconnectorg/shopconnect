/* eslint-disable @next/next/no-img-element */
'use client'
import { addAbortListener } from 'events';
import { items } from '@/data/storeData';
import { useStore } from '../../../src/store';
import { Item } from '@/src/types';

export default function Page({params} : {params: {id: string}}) {
  const addToCart = useStore((state) => state.addToCart);
  const listing = items.find(item => item.id === Number(params.id));

  return (
    <div className="hero">
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
            <button className="btn btn-primary" onClick={() => { addToCart(listing as Item) }}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}