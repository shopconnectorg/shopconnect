/**
 * Express router paths
 */
export default {
  ShopConnect: {
    Base: '/shopconnect-plugin/',
    Promotions: {
      Get: '/promotions',
      ApplyPromotion: '/:promotionId/apply'
    }
  }
} as const;
