import data from './data.json';

const storeData = data[process.env.NEXT_PUBLIC_STORE_ID ? process.env.NEXT_PUBLIC_STORE_ID : 'store1'];

const items = storeData.items;

export {
  storeData,
  items
}
