/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Stores: {
    Base: '/stores',
    Promotions: {
      Get: '/:storeId/promotions',
    },
    Issue: {
      Post: '/:storeId/issue',
    },
    Verify: {
      Post: '/:storeId/:promotionId/verify',
    },
  },

} as const;
