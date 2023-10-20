'use client';
import { useEffect } from "react";

import { fetchPromotions } from '../service';

export default () => {
  useEffect(() => {
    fetchPromotions();
    // Load promotions when initialised
  }, []);

  return (
    <div id="shopconnect-plugin" />
  );
};
