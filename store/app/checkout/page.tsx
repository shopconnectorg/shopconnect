"use client";
import { useState, Fragment } from "react";
import { CompletePurchase } from "@/components";
import { useCart } from '@/src/hooks';
import { useStore } from "@/src/store";
import { confirmPurchase } from '@/shopconnect-plugin/service';
import { useShopConnectStore } from '@/shopconnect-plugin/sc-store';
import { computeItemPromotion } from "@/src/utils";
import { Item } from "@/src/types";
import { storeId } from "@/data/storeData";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cart = useCart();
  const { userDID } = useShopConnectStore((state) => state);
  const { promotions } = useStore((state) => state);
  const [credentialRequest, setCredentialRequest] = useState(null);

  const removeFromCart = (e: any, id: number) => {
    e.stopPropagation();
  };

  const itemPrice = (item: Item) => {
    const promotion = computeItemPromotion(promotions, item);

    return (
        <div className="flex flex-row items-center gap-2 justify-end">
          <p className={`ml-4 text-lg font-medium${promotion.unitDiscount > 0 && ' line-through'}`}>${item.price}</p>
          {promotion.unitDiscount > 0 && (
            <p className="text-lg font-medium text-red-500">
              ${promotion.finalUnitPrice}
            </p>
          )}
        </div>
    )
  }

  const purchase = async () => {
    setError('');
    setLoading(true);
    try {
      //FIXME: Currently only one cart item is supported
      const [{ quantity, item }] = cart.items;
      const promotion = computeItemPromotion(promotions, item);
      const price = Math.round(promotion.finalUnitPrice * 100);
      //TODO: Maybe trigger loading animation?
      const authRequest = await confirmPurchase(userDID, item, quantity, price);
      setCredentialRequest(authRequest);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  }

  const purchaseButton = () => {
    let buttonClass = `items-center btn shadow-sm px-6 py-3 text-base font-bold text-white ${storeId === 'store1' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600'}`;

    if (!userDID) {
      buttonClass += ' btn disabled';
    }

    return (
      <button
        className={buttonClass}
        onClick={()=>purchase()}
        disabled={!userDID}
      >
        {loading && <span className="loading loading-spinner"></span>}
        Complete purchase
      </button>
    )
  };

  return (
    <>
      {credentialRequest ? (
        <CompletePurchase credentialRequest={credentialRequest} item={cart.items[0]} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
          <div className="w-1/2 pr-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">Shipping Information</h3>
              <div className="gap-8 flex flex-col">
                <div className="flex flex-row gap-8">
                  <div>
                    <label className="block font-medium leading-6 text-gray-900">First name</label>
                    <input className="input input-bordered mt-1" />
                  </div>
                  <div>
                    <label className="block font-medium leading-6 text-gray-900">Last name</label>
                    <input className="input input-bordered mt-1" />
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <div>
                    <h3>Address</h3>
                    <input className="input input-bordered" />
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <div>
                    <h3>City</h3>
                    <input className="input input-bordered" />
                  </div>
                  <div>
                    <h3>Country</h3>
                    <input className="input input-bordered" />
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <div>
                    <h3>State</h3>
                    <input className="input input-bordered" />
                  </div>
                  <div>
                    <h3>Zip</h3>
                    <input className="input input-bordered" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-shrink-0">
            <div className="pl-10">
              <h3 className="text-2xl font-bold mb-6">Order summary</h3>
              <div className="flow-root border-gray-300 border-2 p-6 rounded-xl">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.items.map((cartItem) => (
                    <li key={cartItem.item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={cartItem.item.name}>{cartItem.item.name}</a>
                            </h3>
                            <div className="ml-4">{itemPrice(cartItem.item)}</div>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {cartItem.item.description.substr(0, 80)}...
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-4">
                          <p className="text-gray-500">
                            Quantity: {cartItem.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li className="flex py-6 flex-col gap-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>Subtotal</h3>
                      <p className="ml-4">${cart.total}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>Shipping</h3>
                      <p className="ml-4">$4.99</p>
                    </div>
                  </li>
                  <li className="flex py-6 flex-col">
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <h3>Total</h3>
                      <p className="ml-4">${cart.total + 4.99}</p>
                    </div>
                  </li>
                  <li className="flex py-6 flex-col">
                    {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                    {purchaseButton()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
