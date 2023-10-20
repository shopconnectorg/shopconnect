/**
 * Express router paths
 */
export default {
  Base: '/',
  Stores: {
    Base: '/stores',
    Promotions: {
      Get: '/:storeId/promotions',
      VerifyProof: '/:storeId/promotions/:promotionId'
    }
  }
} as const;
