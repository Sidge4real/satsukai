import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Header from "@/components/header";
import { ShopContext } from '@/ShopContext';
import { IBag, IShopItem } from '../../types/IShopItem';
import ShopCart from '@/components/cart';
import { useRouter } from 'next/router';
import LoadingScreen from '@/components/loadingScreen';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingList, setShoppingList] = useState<IShopItem[]>([]);
  const [showCartOverlay, setShowCartOverlay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []); 

  const addToCart = (item: IShopItem) => {
    item.amount_to_buy = 1;
    item.openDetails = false;
    setShoppingList(prev => [...prev, item]);
  };

  const toggleCartOverlay = () => {
    setShowCartOverlay(!showCartOverlay);
  };

  const deleteItemFromList = (item: IShopItem) => {
    setShoppingList((prevShoppingList) => prevShoppingList.filter((prevItem) => prevItem !== item));
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ShopContext.Provider value={{ items: shoppingList }}>
      <Header toggleCartOverlay={toggleCartOverlay} />
      {showCartOverlay && (
        <ShopCart shoppingList={shoppingList} setShoppingList={setShoppingList} toggleCartOverlay={toggleCartOverlay} />
      )}
      <Component {...pageProps} addToCart={addToCart} deleteItemFromList={deleteItemFromList} />
    </ShopContext.Provider>
  );
}
