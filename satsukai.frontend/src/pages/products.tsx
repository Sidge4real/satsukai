import Sort from "@/components/Filters/Sort";
import router from "next/router";
import { ShopItem } from "../../types/IShopItem";

const options = [
  "A-Z",
  "Z-A",
  "Most Popular",
  "Best Rating",
  "Newest"
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

const Shop = ({ products }: { products: ShopItem[] }) => { 
  return (
    <div className="bg-white p-8">
      <nav className="flex gap-4 my-3">
        <Sort type="single" options={options} />
        <div className="ml-auto flex gap-4">
          <Sort type="multi" options={categories} name="Category" position="right" />   
          <Sort type="multi" options={prices} name="Price" position="right" />       
          <Sort type="multi" options={sizes} name="Size" position="right" />    
          <button className="material-symbols-outlined">tune</button>
        </div>
      </nav>
      {products.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-opacity-100 rounded-md cursor-pointer"
              style={{ flexBasis: "calc(33.33% - 1rem)" }}
              onClick={() => router.replace(`products/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.attributes.image.data[0].attributes.url}
                  alt={product.attributes.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{product.attributes.title}</h3>
                <p className="text-gray-700">&euro;{product.attributes.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:1337/api/products?populate=image");

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
