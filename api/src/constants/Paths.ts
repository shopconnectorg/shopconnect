/**
 * Express router paths go here.
 */


export default {
  Base: '/v1',
  Stores: {
    Base: '/stores',
    Promotions: {
      Get: '/:storeId/promotions'
    }
  }
} as const;
