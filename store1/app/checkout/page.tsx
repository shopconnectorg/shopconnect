/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
import { Listing, CartItem } from "@/types";
import Link from "next/link";
import { cartContext } from "../template";

export default function Page() {
  const { cart, setCart } = useContext(cartContext)!;
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [localStorage.getItem("cart")]);

  useEffect(() => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

  const removeFromCart = (e: any, id: number) => {
    e.stopPropagation();

    const itemQuantity = cart?.find((item) => item.id === id)?.quantity;
    if (itemQuantity && itemQuantity > 1) {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      setCart(cartItems);
    } else {
      const newCart = cart?.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart as CartItem[]);
    }
  };

  return (
    <div className="flex  justify-evenly mt-8">
      <div className="w-1/2 p-6">
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

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={(e) => removeFromCart(e, product.id)}
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
            <li className="flex py-6 flex-col">
              <button className="btn">Connect to ShopConnect</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-10">
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
    </div>
  );
}
