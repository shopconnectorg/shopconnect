import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { Promotion } from '@/src/types';

interface ShopConnectState {
  listenerInitialized: boolean,
  promotions: Promotion[],
  userDID: string,
}

type ShopConnectActions = {
  savePromotions: (promotions: []) => void,
  setUserDID: (value: string) => void,
  updateListenerInitialized: (listenerInitialized: ShopConnectState['listenerInitialized']) => void
}

const useShopConnectStore = create<ShopConnectState & ShopConnectActions>()(
  devtools(
    (set) => ({
      listenerInitialized: false,
      promotions: [],
      userDID: '',
      savePromotions: (promotions) => set(() => ({ promotions })),
      setUserDID: (value) => set(() => ({ userDID: value })),
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
