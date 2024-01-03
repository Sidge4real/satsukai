import { IShopItem } from "../../../types/IShopItem";
import TuneModal from "@/components/modal";
import { useContext, useState } from "react";
import Breadcrumbs from "@/components/breadcumbs";
import router, { useRouter } from "next/router";
import { ICategory } from "../../../types/ICategory";
import { ShopContext } from "@/ShopContext";
import DetailScreen from "@/components/detailScreen";

const Shop = ({ products, categories, addToCart, deleteItemFromList }: { products: IShopItem[], categories: ICategory[], addToCart : (item: IShopItem) => void, deleteItemFromList: (item: IShopItem) => void }) => {
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
    <DetailScreen
    openTuneModal={openTuneModal}
    products={products}
    items={items}
    addToCart={addToCart}
    deleteItemFromList={deleteItemFromList}
    categories={categories}
    isTuneModalOpen={isTuneModalOpen}
    closeTuneModal={closeTuneModal}
    />
  );
};

export async function getStaticProps() {
  let endpoint = "Ferns";

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
