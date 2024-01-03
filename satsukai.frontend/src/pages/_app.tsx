import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Header from "@/components/header";
import { ShopContext } from '@/ShopContext';
import { IBag, IShopItem } from '../../types/IShopItem';
import ShopCart from '@/components/cart';
import { useRouter } from 'next/router';

const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="flex items-center">
      <img style={{ width: "180px" }} src='brand.png' alt='logo' />
      <p style={{fontSize:"60px", color:"#999"}} className='expr'>Satsukai</p>
    </div>
  </div>
);

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingList, setShoppingList] = useState<IShopItem[]>([]);
  const [showCartOverlay, setShowCartOverlay] = useState(false);

  let router = useRouter();
  let title = "";

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []); 

  // useEffect(() => {
  //   if (router.route === "/products" || router.route.startsWith("/products/")) {
  //     title = "shop";
  //   }

  //   document.title = `Satsukai${title ? ` | ${title}` : ''}`;
  // }, [router.route]);

  const addToCart = (item: IShopItem) => {
    item.amount_to_buy = 1;
    item.openDetails = false;
    setShoppingList(prev => [...prev, item]);
  };

  const toggleCartOverlay = () => {
    setShowCartOverlay(!showCartOverlay);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ShopContext.Provider value={{ items: shoppingList }}>
      <Header toggleCartOverlay={toggleCartOverlay} />
      {showCartOverlay && (
        <ShopCart shoppingList={shoppingList} setShoppingList={setShoppingList} toggleCartOverlay={toggleCartOverlay} />
      )}
      <Component {...pageProps} addToCart={addToCart} />
    </ShopContext.Provider>
  );
}
