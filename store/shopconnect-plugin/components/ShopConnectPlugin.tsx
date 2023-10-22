'use client';

import { useShopConnect } from '../hooks';

export default () => {
  useShopConnect();

  return (
    <div id="shopconnect-plugin" />
  );
};
