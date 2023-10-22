/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext, Fragment } from "react";
import { Listing, CartItem } from "@/types";
import Link from "next/link";
import { useCartTotalPrice } from '@/src/hooks';
import { CompletePurchase } from "@/components";
import { useStore } from "@/src/store";

export default function Page() {
  const [connected, setConnected] = useState(false);

  const cart = useStore((store) => store.cart)
  const cartTotalPrice = useCartTotalPrice();
  const discounts = useStore((state) => state.discounts);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const removeFromCart = (e: any, id: number) => {
    e.stopPropagation();

    // const itemQuantity = cart?.find((item) => item.id === id)?.quantity;
    // if (itemQuantity && itemQuantity > 1) {
    //   const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    //   const itemIndex = cartItems.findIndex((item: any) => item.id === id);
    //   if (itemIndex !== -1) {
    //     cartItems[itemIndex].quantity -= 1;
    //   }
    //   localStorage.setItem("cart", JSON.stringify(cartItems));
    //   setCart(cartItems);
    // } else {
    //   const newCart = cart?.filter((item) => item.id !== id);
    //   localStorage.setItem("cart", JSON.stringify(newCart));
    //   setCart(newCart as CartItem[]);
    // }
  };

  const purchase = () => {
    setPurchaseComplete(true);
  }

  const itemPrice = (item) => {
    const discountItem = discounts.find((discount) => discount.itemId === item.id);
    const discount = discountItem ? discountItem.percentage / 100 : 0;
    return (
      <Fragment>
        <p className={`ml-4${discount > 0 && ' line-through'}`}>{item.price}</p>
        {discount > 0 && (
          <p className="mt-1 text-lg font-medium text-red-500">
            {(1 - discount) * item.price}
          </p>
        )}
      </Fragment>
    )
  }

  return (
    <>
      {purchaseComplete ? (
        <CompletePurchase />
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
                      <p className="ml-4">${cartTotalPrice}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>Shipping</h3>
                      <p className="ml-4">$4.99</p>
                    </div>
                  </li>
                  <li className="flex py-6 flex-col">
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <h3>Total</h3>
                      <p className="ml-4">${cartTotalPrice + 4.99}</p>
                    </div>
                  </li>
                  <li className="flex py-6 flex-col">
                    <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={()=>purchase()}>
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
