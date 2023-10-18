"use client";
import { useEffect, useState } from "react";
import { Listing } from "@/types";
import Link from "next/link";

export default function Page() {
  const [cart, setCart] = useState([] as Listing[]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [localStorage.getItem("cart")]);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

  return (
    <div className="min-h-screen px-10">
      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th className="w-1/6"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="Item image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <th>
                      <Link
                        href={`/item/${item.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            Total: ${cartTotal}
            <button className="btn btn-primary btn-wide">Connect</button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          No items in cart
        </div>
      )}
    </div>
  );
}
