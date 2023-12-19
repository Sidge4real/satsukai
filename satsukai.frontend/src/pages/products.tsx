import Sort from "@/components/Filters/Sort";
import router from "next/router";
import { IShopItem } from "../../types/IShopItem";
import { useState } from "react";
import { IServerSideProps } from "../../types/render";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const options = [
  "A-Z",
  "Z-A"
]
const categories = [
  "Bonsai Trees",
  "Ferns",
  "Flowering Plants",
  "Bamboo Plants",
  "Ornamental Grasses",
  "Water Plants",
  "Medicinal Herbs",
  "Succulents",
  "Fruit Trees",
  "Climbing Plants"
];

const prices = [
  "> €100",
  "€50 - €100",
  "< €50"
]

const sizes = [
  "Small", //(Up to 6 inches)
  "Medium", //(6 to 12 inches)
  "Large", //(12 to 24 inches)
  "Extra Large", //(24 inches and above)
];

const Shop = ({ products }: { products: IShopItem[] }) => { 
  const [sortOption, setSortOption] = useState('A-Z');
  const [sortPrice, setSortPrice] = useState<string[]>([]);
  const [sortCategories, SetSortCategories] = useState<string[]>([]);
  const [sortSizes, setSortSizes] = useState<string[]>([]);

  console.log(sortOption + " " + sortCategories + " " + sortPrice + " " + sortSizes)

  let filteredProducts = [...products];

  if (sortOption === "Z-A") {
    filteredProducts.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
  } else {
    filteredProducts.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
  }

  return (
    <div className="bg-white p-8">
      <nav className="flex gap-4 my-3">
        <Sort type="single" options={options} onChangeSingle={setSortOption} />
        <div className="ml-auto flex gap-4">
          <Sort type="multi" options={categories} name="Category" position="right" onChangeMulti={SetSortCategories} />   
          <Sort type="multi" options={prices} name="Price" position="right" onChangeMulti={setSortPrice} />       
          <Sort type="multi" options={sizes} name="Size" position="right" onChangeMulti={setSortSizes} />    
          <button className="material-symbols-outlined">tune</button>
        </div>
      </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8">
          {products && filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-opacity-100 rounded-md cursor-pointer transition-transform transform hover:shadow-md hover:-translate-y-2 hover:bg-gray-100 p-3"
              style={{ flexBasis: "calc(33.33% - 1rem)" }}
              onClick={() => router.replace(`products/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.attributes.image.data[0].attributes.url}
                  alt={product.attributes.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{product.attributes.name}</h3>
                <p className="text-gray-700">&euro;{product.attributes.price}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex items-center justify-center sm:flex-1 sm:items-center sm:justify-center">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  </div>


    </div>
  );
};


export async function getServerSideProps({ query } : IServerSideProps) {
  try {
    // filters added:
    // http://localhost:1337/api/products?populate=*&filters[$and][0][category][name][$eq]=Bonsai%20Trees

    const filters = {
      $and: [
        { category: query },
        { createdAt: { $gt: '2021-11-17T14:28:25.843Z' } },
      ],
    };

    const response = await fetch("http://localhost:1337/api/products?populate=*");



    if (response.ok) {
      const data = await response.json();
      return { props: { products: data.data } };
    } else {
      console.error("Failed to fetch data");
      return { props: { products: [] } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { products: [] } };
  }
}



export default Shop;
