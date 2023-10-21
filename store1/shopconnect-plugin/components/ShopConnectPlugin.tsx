'use client';
import { useEffect } from "react";

import { initializeShopConnect } from '../service';
import { useShopConnect } from '../hooks';

export default () => {
  useShopConnect();

  return (
    <div id="shopconnect-plugin" />
  );
};
