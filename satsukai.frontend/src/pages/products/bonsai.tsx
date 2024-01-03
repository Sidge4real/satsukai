import { IShopItem } from "../../../types/IShopItem";
import TuneModal from "@/components/modal";
import { useContext, useState } from "react";
import Breadcrumbs from "@/components/breadcumbs";
import router, { useRouter } from "next/router";
import { ICategory } from "../../../types/ICategory";
import { ShopContext } from "@/ShopContext";

const Shop = ({ products, categories }: { products: IShopItem[], categories: ICategory[]  }) => {
  const {items} = useContext(ShopContext);
  const router = useRouter();
  const [isTuneModalOpen, setTuneModalOpen] = useState(false);

  const openTuneModal = () => {
    if (isTuneModalOpen) {
      closeTuneModal();
    }
    setTuneModalOpen(true);
  };

  const closeTuneModal = () => {
    setTuneModalOpen(false);
  };


  return (
    <div className="bg-white p-8">
      <nav className="flex gap-4 my-3">
        <div className="flex gap-4">
          <button onClick={openTuneModal} className="material-symbols-outlined">tune</button>
          <Breadcrumbs />
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8">
        {products.length > 0 ? products.map((product) => (
          <div
            key={product.id}
            className="bg-opacity-100 rounded-md cursor-pointer transition-transform transform hover:shadow-md hover:-translate-y-2 hover:bg-gray-100 p-3"
            style={{ flexBasis: "calc(33.33% - 1rem)" }}
            onClick={() => router.replace(`/products/${product.id}`)}
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
        )) : <p>There are no products avaible for this category</p>}
        </div>

        <TuneModal categories={categories} isOpen={isTuneModalOpen} onClose={closeTuneModal} />
    </div>
  );
};

export async function getStaticProps() {
  let endpoint = "Bonsai%20Trees";

  const categoriesResp = await fetch(`http://localhost:1337/api/categories?populate=*`);
  const categoriesData = await categoriesResp.json();
  const categories = categoriesData.data;

  const response = await fetch(`http://localhost:1337/api/products?populate=*&filters[$and][0][category][name][$eq]=${endpoint}`);
  const data = await response.json();

  const products = data.data;

  return {
    props: {
      products,
      categories
    },
  };
}

export default Shop;
