/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "../app/template";
import { useEffect, useState } from "react";

export default function CompletePurchase() {
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

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
          <h3>Tracking number</h3>
          <p className="text-indigo-600">1Z204E380338943508</p>
        </div>

        <div className="flow-root border-gray-300 border-2 p-6 rounded-xl">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart?.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.name}>{product.name}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qantity: {product.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
            <li className="flex py-6 flex-row gap-4 justify-evenly">
              <div className="flex flex-col text-base font-medium text-gray-900">
                <h3>Shipping Address</h3>
                <div>
                  <p className="font-light text-sm">Random Street</p>
                  <p className="font-light text-sm">9374 Avenue</p>
                  <p className="font-light text-sm">Oporto, 1933-32</p>

                </div>
              </div>
              <div className="flex flex-col text-base font-medium text-gray-900">
                <h3>Payment method</h3>
                <p className="font-light text-sm">ShopConnect</p>
                  <p className="font-light text-sm">0x197...7298</p>
              </div>
            </li>
            <li className="flex py-6 flex-col gap-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>Subtotal</h3>
                <p className="ml-4">${cartTotal}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>Shipping</h3>
                <p className="ml-4">$4.99</p>
              </div>
            </li>
            <li className="flex py-6 flex-col">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <h3>Total</h3>
                <p className="ml-4">${cartTotal + 4.99}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
