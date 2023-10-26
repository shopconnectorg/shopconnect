/* eslint-disable @next/next/no-img-element */
'use client'
import { addAbortListener } from 'events';
import { items } from '@/data/storeData';
import { useStore } from '../../../src/store';
import { Item } from '@/src/types';
import { computeItemPromotion } from '@/src/utils';

export default function Page({params} : {params: {id: string}}) {
  const addToCart = useStore((state) => state.addToCart);
  const itemData = items.find(item => item.id === Number(params.id));
  const promotions = useStore((state) => state.promotions);

  const { finalUnitPrice, promotion, unitDiscount } = computeItemPromotion(promotions, itemData);

  return (
    <div className="hero">
      <div className="hero-content items-start flex-row h-full" style={{maxHeight:"80%"}}>
        <img src={itemData.image} className="h-full rounded-lg shadow-2xl" />
        <div className="flex justify-between flex-col h-full">
          <div>
            <h1 className="text-5xl font-bold">{itemData.name}</h1>
            <p className="py-4">
              {itemData.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-6 justify-end">
            {
              unitDiscount > 0 && promotion !== undefined ? (
                  <div className="flex flex-row gap-2">
                    <p className="mt-1 text-3xl font-bold line-through">${itemData.price}</p>
                    <p className="mt-1 text-3xl font-bold text-red-500">${finalUnitPrice}</p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold">${itemData.price}</p>
                )
            }
            <button className="btn btn-primary" onClick={() => { addToCart(itemData as Item) }}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
