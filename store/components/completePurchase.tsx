"use client";
import { storeId } from '@/data/storeData';
import { useState } from 'react';
// import { useCartTotalPrice } from '@/src/hooks';
// import { useStore } from "@/src/store";

// @ts-ignore
export default function CompletePurchase({ credentialRequest, item }) {
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState('');

  async function storeCredential() {
    setError('');
    try {
      const credentialData = btoa(JSON.stringify(credentialRequest));
      const purchaseData = btoa(JSON.stringify({ ...item }));
      const event = new CustomEvent('authEvent', { detail: `iden3comm://?i_m=${credentialData}&purchase=${purchaseData}` });
      //TODO: Maybe trigger loading animation?
      document.dispatchEvent(event);
      //TODO: Maybe wait for credential to be actually stored?
      setClaimed(true);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  }

  return (
    <div className="flex justify-center mt-6 pb-6">
      <div className="flex flex-col gap-y-12 w-1/2">
        <div>
          <h1 className="font-bold text-4xl mb-4">
            Thank you for your purchase!
          </h1>
          <p className="text-gray-500">
            Your order will be shipped and delivered to you soon.
          </p>
        </div>
        <div className="hero bg-base-200 pt-12 pb-12 rounded-lg">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold">Claim your <span className="text-blue-600">ShopConnect</span> proof of purchase!</h1>
              <p className="py-6 font-medium">
                Get access to exclusive promotions.
              </p>
              <div className="flex items-center flex-col w-full">
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                <button
                  className={`flex items-center justify-center rounded-md btn border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 ${claimed && 'btn-disabled'}`}
                  onClick={storeCredential}
                >
                  Claim ⚡
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
