import type { ComputedItemPromotion, Item, Promotion } from './types';

const computeItemPromotion = (promotions: Promotion[], item: Item): ComputedItemPromotion => {
  // console.log(promotions, item);
  const promotion = promotions.find((promotion) => promotion.appliesTo?.category === item.category)

  const unitDiscount = promotion ? item.price * promotion.discount / 100 : 0;

  return {
    finalUnitPrice: item.price - unitDiscount,
    promotion,
    unitDiscount
  }
};

export {
  computeItemPromotion
}
