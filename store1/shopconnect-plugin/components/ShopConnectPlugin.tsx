'use client';
import { useEffect } from "react";

import { initializeShopConnect } from '../service';

export default () => {
  useEffect(() => {
    const asyncInit = async () => {
      await initializeShopConnect();
    };

    asyncInit();
  }, []);

  return (
    <div id="shopconnect-plugin" />
  );
};
