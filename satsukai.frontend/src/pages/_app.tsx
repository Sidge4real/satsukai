import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from "@/components/header";
import { useState } from 'react';
import { ShopContext } from '@/ShopContext';
import { IBag, IShopItem } from '../../types/IShopItem';

export default function App({ Component, pageProps }: AppProps) {
  const [shoppingList, setShoppingList] = useState<IBag[]>([]);
  const [showCartOverlay, setShowCartOverlay] = useState(false);

  const toggleCartOverlay = () => {
    setShowCartOverlay(!showCartOverlay);
  };

  return (
    <ShopContext.Provider value={{items: shoppingList}}>
      <Header toggleCartOverlay={toggleCartOverlay} />
      {showCartOverlay && (
  <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 w-1/2 z-50 flex items-end p-4">
    <div className="bg-white p-4 h-full overflow-y-auto animate-slideInRight absolute top-0 right-0 flex flex-col w-full sm:w-[20vw]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <button className="text-gray-500" onClick={toggleCartOverlay}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      {shoppingList.map((item, index) => (
        <div key={index} className="mb-4 pb-4 border-b border-gray-300">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">Prijs: {item.price} EUR</p>
          <div className="flex items-center mt-2">
            <button className="text-red-500 mr-2" onClick={() => {}}>
              delete
            </button>
            <button className="text-blue-500 mr-2" onClick={() => {}}>
              +1 buy
            </button>
            <button className="text-green-500" onClick={() => {}}>
              {item.hasKit ? "Kit verwijderen" : "Voeg kit toe"}
            </button>
          </div>
        </div>
      ))}
      {
        shoppingList.length == 0 && <p>There are no items in your shopping card added...</p>
      }
      {
        shoppingList.length != 0 && <div className="mt-4">
        <p className="text-lg font-semibold">total: {} EUR</p>
      </div>
      }
    </div>
  </div>
)}


      <Component {...pageProps} />
    </ShopContext.Provider>
  );
}