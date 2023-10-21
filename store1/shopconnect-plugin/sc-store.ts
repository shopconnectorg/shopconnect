import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

interface ShopConnectState {
  listenerInitialized: boolean,
  promotions: []
}

type ShopConnectActions = {
  updateListenerInitialized: (listenerInitialized: ShopConnectState['listenerInitialized']) => void
}

const useShopConnectStore = create<ShopConnectState & ShopConnectActions>()(
  devtools(
    (set) => ({
      listenerInitialized: false,
      promotions: [],
      updateListenerInitialized: (listenerInitialized) => set(() => ({ listenerInitialized }))
    }),
    {
      name: 'shop-connect-storage',
    }
  )
)

export {
  useShopConnectStore
};
