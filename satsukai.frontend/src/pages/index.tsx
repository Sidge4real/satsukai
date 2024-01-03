import Head from 'next/head';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IShopItem } from "../../types/IShopItem";
import { ShopContext } from '@/ShopContext';

export default function Home({ products }: { setShoppingList: Dispatch<SetStateAction<IShopItem[]>>, products: IShopItem[] }) {
  const { items } = useContext(ShopContext);

  console.log(products)

  return (
    <>
      <main className='h-screen w-full'>
        <section>
          {
            products && products.map(product => <article>
              <img src={product.attributes.image.data[0].attributes.url} alt="" />
            </article>)
          }
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(`http://localhost:1337/api/categories?populate=*&filters[$and][0][showroom][$eq]=true`);
  const data = await response.json();
  const products = data.data;

  console.log(products)

  return {
    props: {
      products
    },
  };
}