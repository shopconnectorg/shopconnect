import { useStore } from './store';

const useCartTotalQuantity = () => {
  const cart = useStore((state) => state.cart);

  return cart.items.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
};

const useCartTotalPrice = () => {
  const cart = useStore((state) => state.cart);

  return cart.items.reduce((accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.item.price, 0)
}

export {
  useCartTotalPrice,
  useCartTotalQuantity
};
