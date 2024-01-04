import Breadcrumbs from "@/components/breadcumbs";
import TuneModal from "@/components/categoryModal";
import { IShopItem } from "../../types/IShopItem";
import { useContext, useState } from "react";
import router from "next/router";
import { ICategory } from "../../types/ICategory";
import { ShopContext } from "@/ShopContext";

const categoryPage = ({categories} : {categories: ICategory[]}) => {    
    const {items} = useContext(ShopContext);

    return <>
        <div className="bg-white p-8">
        <nav className="flex gap-4 my-3">
            <div className="flex gap-4">
                <Breadcrumbs />
            </div>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8">
            {categories.map((category) => (
            <div
                key={category.id}
                className="bg-opacity-100 rounded-md cursor-pointer transition-transform transform hover:shadow-md hover:-translate-y-2 hover:bg-gray-100 p-3"
                style={{ flexBasis: "calc(33.33% - 1rem)" }}
                onClick={() => router.replace(`products/${category.attributes.endpoint}`)}
            >
                <div className="relative">
                <img
                    src={category.attributes.cover.data?.attributes.url}
                    alt={category.attributes.name}
                    className="w-full h-full object-cover rounded-md"
                />
                </div>
                <div className="mt-2">
                <h3 className="text-lg font-semibold">{category.attributes.name}</h3>
                </div>
            </div>
            ))}
        </div>
        </div>
    </>
}

export async function getStaticProps() {
    const response = await fetch(`http://localhost:1337/api/categories?populate=*`);
    const data = await response.json();
  
    const categories = data.data;
  
    return {
      props: {
        categories,
      },
    };
  }

export default categoryPage;