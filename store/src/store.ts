import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension' // required for devtools typing

import { Cart, CartItem, Item } from './types';

type Store = {
  cart: Cart,
  cartDisplayed: boolean
};

type StoreActions = {
  addToCart: (item: Item) => void,
  setCartDisplayed: (value: boolean) => void
}

const useStore = create<Store & StoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        cart: { items: [] },
        cartDisplayed: false,
        // Actions
        addToCart: (item) => set(() => {
          const cart = get().cart

          if (cart.items.some((cartItem) => cartItem.item.id === item.id)) {
            return {
              cart: {
                ...cart,
                items: cart.items.map((cartItem) => {
                  if (cartItem.item.id === item.id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1};
                  }

                  return cartItem;
                })
              },
              cartDisplayed: true
            };
          }

          return {
            cart: {
              ...cart,
              items: [...cart.items, { item, quantity: 1 }]
            },
            cartDisplayed: true,
          }
        }),
        setCartDisplayed: (value) => set(() => ({ cartDisplayed: value }))
      }),
      {
        name: 'store-state',
        partialize: (({ cart }) => {
          cart
        })
      }
    )
  )
);

export { useStore };
