import { useStore } from './store';
import { computeItemPromotion } from './utils';

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const promotions = useStore((state) => state.promotions);

  let total = 0;
  let totalQuantity = 0;

  const computedCart = {
    ...cart,
    items: cart.items.map((item) => {
      const { unitDiscount } = computeItemPromotion(promotions, item.item);

      const finalUnitPrice = item.item.price - unitDiscount;

      total += finalUnitPrice * item.quantity;
      totalQuantity += item.quantity;

      return {
        ...item,
        unitDiscount,
        finalUnitPrice
      };
    }),
    total: 0,
    totalQuantity: 0
  }

  computedCart.total = total;
  computedCart.totalQuantity = totalQuantity;

  return computedCart;
}

export {
  useCart
};
