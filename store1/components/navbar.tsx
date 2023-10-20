"use client";

import Link from "next/link";
import { useEffect, useState, createContext, Dispatch, SetStateAction, useContext } from "react";
import { Listing } from "@/types";
import { useRouter } from "next/navigation";
import { cartContext } from "../app/template";

export default function Navbar() {
  const { cart, setCart } = useContext(cartContext)!;
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [setCart]);

  useEffect(() => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  }

  const removeFromCart = (e:any, id:number) => {
    e.stopPropagation();
    const newCart = cart?.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart as Listing[]);
  }

  return (
    <div className="navbar shadow-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Coffee Grounds Shop
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <cartContext.Provider value={{ cart, setCart}}>
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-red-500">{cart?.length}</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-300 shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{cart?.length} Items</span>
                  <span>
                    <button className="btn btn-error btn-xs" onClick={()=>{clearCart()}}>clear</button>
                  </span>
                </div>
                <ul className="menu p-0 m-0">
                  {cart?.map((item, index) => (
                    <li key={index} onClick={()=>{router.push(`/item/${item.id}`)}}>
                      <a className="justify-between">
                        {item.name}
                        <div className="flex flex-col gap-2 items-center">
                          <span className="badge badge-primary">${item.price}</span>
                          <span className="badge badge-error" onClick={(e)=>removeFromCart(e, item.id)}>Remove</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <span className="text-info">Subtotal: ${cartTotal}</span>
                <div className="card-actions">
                  <Link href="/cart" className="btn btn-primary btn-block">View Cart</Link>
                </div>
              </div>
            </div>
          </cartContext.Provider>
        </div>
        <div>
          <button className="btn btn-success">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
