import { useRouter } from 'next/router';
import { IShopItem } from '../../../types/IShopItem';
import Link from 'next/link';
import Breadcrumbs from '@/components/breadcumbs';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ShopContext } from '@/ShopContext';

interface IDetailPage {
  product: IShopItem;
  addToCart: (item: IShopItem) => void;
  setShoppingList?: Dispatch<SetStateAction<IShopItem[]>>;
}
const ProductDetailPage = ({ product, addToCart } : IDetailPage) => {
  const {items } = useContext(ShopContext);
  const [history, setHistory] = useState([]);
  
  const router = useRouter();

  if (!product || product == null || undefined) {
    router.replace('/404');
    return null;
  }
  
  
  


  const features = [
    { name: 'Origin', description: product.attributes.origin},
    { name: 'Category', description: product.attributes.category.data.attributes.name },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Temperatures', description: product.attributes.category.data.attributes.temperature },
    { name: 'Optional', description: "" },
    { name: 'Price', description: "€" + product.attributes.price },
  ]

  return (
    <div className="bg-white">
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <Breadcrumbs param={product.attributes.name} category={product.attributes.category.data} />
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.attributes.name}
          </h2>
        </div>
        <p className="mt-4 text-gray-500">{product.attributes.slogan}</p>
        <div className="mt-4 flex items-center space-x-4">
          <button 
            className={`flex items-center text-white hover:bg-green-600 rounded-md px-3 ${!items.some((item) => item.id === product.id) ? "bg-green-500" : "bg-green-600" } py-2`}
            onClick={() => {
              !items.some((item) => item.id === product.id) &&
              addToCart(product);
            }}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {
              !items.some((item) => item.id === product.id) ? <span className="ml-2">Add to Cart</span> : <span className="ml-2">Added to cart!</span> 
            }
          </button>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{feature.name}</dt>
              <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={product.attributes.image.data[0].attributes.url}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          {/* <img
            src={product.attributes.including.data.attributes.images.data[0].attributes.url}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100 w-full"
          />
          <img
            src={product.attributes.including.data.attributes.images.data[1].attributes.url}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100 w-full"
          />
          <img
            src={product.attributes.including.data.attributes.images.data[2].attributes.url}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100 w-full"
          /> */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link href={`/products/${product.attributes.category.data.attributes.endpoint}`}>
          <p className="flex items-center justify-center w-full sm:w-auto text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2">
            Return
          </p>
        </Link>
      </div>
    </div>
  )
};


export async function getServerSideProps({ params }: { params: { id: string }, res: any }) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/products?populate=deep&filters[id][$eq]=${params.id}`
    );

    if (response.ok) {
      const data = await response.json();
      const [product] = data.data;

      if (!product) {
        return { props: { product: null } }
      }

      return { props: { product } };
    } else {
      console.error("Failed to fetch data");
      return { props: { product: null } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { product: null } };
  }
}

export default ProductDetailPage;
