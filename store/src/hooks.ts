import { useStore } from './store';

const useCartTotalQuantity = () => {
  const cart = useStore((state) => state.cart);

  return cart.items.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
};

const useCartTotalPrice = () => {
  const cart = useStore((state) => state.cart);
  const discounts = useStore((state) => state.discounts);

  return cart.items.reduce((accumulator, cartItem) => {
    const discountItem = discounts.find((discount) => discount.itemId === cartItem.item.id);
    const discount = discountItem ? (1 - discountItem.percentage / 100) : 1;

    return accumulator + cartItem.quantity * cartItem.item.price * discount;
  }, 0)
}

export {
  useCartTotalPrice,
  useCartTotalQuantity
};
