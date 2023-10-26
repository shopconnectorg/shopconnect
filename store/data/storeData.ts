import data from './data.json';

const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'store1';

const { config, items } = data[storeId];

export {
  config,
  items,
  storeId 
}
