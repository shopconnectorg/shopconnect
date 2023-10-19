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
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
