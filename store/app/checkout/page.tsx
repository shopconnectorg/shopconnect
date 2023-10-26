"use client";
import { useState, Fragment } from "react";
import { CompletePurchase } from "@/components";
import { useCart } from '@/src/hooks';
import { useStore } from "@/src/store";
import { confirmPurchase } from '@/shopconnect-plugin/service';
import { useShopConnectStore } from '@/shopconnect-plugin/sc-store';
import { computeItemPromotion } from "@/src/utils";
import { Item } from "@/src/types";

export default function Page() {
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
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {credentialRequest ? (
        <CompletePurchase credentialRequest={credentialRequest} item={cart.items[0]} />
      ) : (
        <div className="gx tv ari asq aus cfc cxj ddh">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
            <div className="w-1/2 flex flex-col gap-10 p-6">
              <h3 className="text-2xl font-bold">Shipping Information</h3>
              <div className="flex flex-row gap-6">
                <div>
                  <h3>First Name</h3>
                  <input className="input input-bordered" />
                </div>
                <div>
                  <h3>Last Name</h3>
                  <input className="input input-bordered" />
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
            <div className="w-1/2 p-6">
              <h3 className="text-2xl font-bold">Order summary</h3>
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
                            <p className="ml-4">{itemPrice(cartItem.item)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {cartItem.item.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qantity: {cartItem.quantity}
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(e) => removeFromCart(e, cartItem.item.id)}
                            >
                              Remove
                            </button>
                          </div>
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
                    <div>Shop Connect plugin: {userDID ? 'OK' : 'N/A'}</div>
                    {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                    <button className={`flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${loading || !userDID ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={()=>purchase()}>
                      Complete purchase
                    </button>
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
