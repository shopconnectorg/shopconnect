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
  Identity: {
    Base: '/identity',
    ConfirmCredentials: {
      Post: '/credentials/:credentialId/confirm'
    },
  },
} as const;
