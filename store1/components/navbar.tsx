"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Listing } from "@/types";
import { useRouter } from "next/navigation";
import { useCart } from "../app/template";
import ShoppingCart from "./shopping";

export default function Navbar() {
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.quantity;
    });
    setItemCount(total);
  }, [cart]);

  return (
    <div className="navbar shadow-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Coffee Grounds Shop
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(true)}
          >
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
              <span className="badge badge-sm indicator-item bg-red-500">
                {itemCount}
              </span>
            </div>
          </label>
          <ShoppingCart open={open} setOpen={setOpen} />
        </div>
        <div>
          <button className="btn btn-success">Connect</button>
        </div>
      </div>
    </div>
  );
}
