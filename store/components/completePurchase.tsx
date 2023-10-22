"use client";
import { useState } from 'react';
import { useCartTotalPrice } from '@/src/hooks';
import { useStore } from "@/src/store";

export default function CompletePurchase() {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="flex justify-center mt-6 pb-6">
      <div className="flex flex-col gap-y-12 w-1/2">
        <div>
          <p className="font-medium text-indigo-600">
            Thank you for your purchase!
          </p>
          <h1 className="font-bold text-4xl">Order on the way!</h1>
          <p className="text-gray-500">
            Your order #1284 has been shipped and will be delivered to you soon.
          </p>
        </div>

        <div className="flex items-start flex-col w-full">
          <h2><b>Claim your ShopConnect proof of purchase!</b></h2><br /><br />
          {claimed ? (
            <p><b>Your proof of purchase has been saved in your ShopConnect wallet!</b></p>
          ):  (
            <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={()=>setClaimed(true)}>
              Claim ⚡
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
