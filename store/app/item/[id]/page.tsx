/* eslint-disable @next/next/no-img-element */
'use client'
import { addAbortListener } from 'events';
import { items, storeId } from '@/data/storeData';
import { useStore } from '../../../src/store';
import { Item } from '@/src/types';
import { computeItemPromotion } from '@/src/utils';

export default function DetailPage({params} : {params: {id: string}}) {
  const addToCart = useStore((state) => state.addToCart);
  const itemData = items.find(item => item.id === Number(params.id));
  const promotions = useStore((state) => state.promotions);

  const { finalUnitPrice, promotion, unitDiscount } = computeItemPromotion(promotions, itemData);

  return (
    <div className="hero">
      <div className="hero-content items-start flex-row h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-20">
        <div className="w-1/2">
          <img src={itemData.image} className="h-full w-full object-cover object-center" />
        </div>
        <div className="flex justify-between flex-col w-1/2">
          <div>
            <h1 className="text-5xl font-bold">{itemData.name}</h1>
            <p className="py-4">
              {itemData.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-6 justify-end mt-16">
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
            <button
              className={`btn ${storeId === 'store1' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
              onClick={() => { addToCart(itemData as Item) }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
