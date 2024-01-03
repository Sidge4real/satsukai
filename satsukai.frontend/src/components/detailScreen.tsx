import { useRouter } from "next/router";
import { ICategory } from "../../types/ICategory";
import { IShopItem } from "../../types/IShopItem";
import Breadcrumbs from "./breadcumbs";
import TuneModal from "./modal";
import { useEffect, useState } from "react";

interface IDetail {
    openTuneModal: () => void;
    products: IShopItem[];
    addToCart: (item: IShopItem) => void;
    deleteItemFromList: (item: IShopItem) => void;
    categories: ICategory[];
    isTuneModalOpen: boolean;
    closeTuneModal: () => void;
    items: IShopItem[];
}

const detailScreen = ({ openTuneModal, products, items, addToCart, deleteItemFromList, categories, isTuneModalOpen, closeTuneModal }: IDetail) => {
    const router = useRouter();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


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
                    className="bg-opacity-100 rounded-md cursor-pointer transition-transform transform hover:shadow-md hover:-translate-y-2 hover:bg-gray-100 p-3 relative"
                    style={{ flexBasis: "calc(33.33% - 1rem)" }}
                >
                    <div className="relative">
                        <img
                            src={product.attributes.image.data[0].attributes.url}
                            alt={product.attributes.name}
                            className="w-full h-full object-cover rounded-md"
                            onClick={() => router.replace(`/products/${product.id}`)}
                        />
                    </div>
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold" onClick={() => router.replace(`/products/${product.id}`)}>
                            {product.attributes.name}
                        </h3>
                        <p className="text-gray-700" onClick={() => router.replace(`/products/${product.id}`)}>
                            &euro;{product.attributes.price}
                        </p>
                        <div className="h-[28px]"></div>
                    </div>
                    {screenWidth < 1400 && screenWidth > 768 ? (
                        <button
                            className="items-center w-full text-white py-1 bg-green-500 hover:bg-green-600 absolute bottom-0"
                            onClick={(e) => {
                                e.preventDefault();
                                !items.some((item) => item.id === product.id)
                                    ? addToCart(product)
                                    : deleteItemFromList(product);
                            }}
                        >
                            <span className="material-symbols-outlined items-center">
                                {items.some((item) => item.id === product.id) ? "delete" : "add"}
                            </span>
                        </button>
                    ) : null}
                    {screenWidth <= 768 || screenWidth >= 1400 ? (
                        <button
                            className="absolute bottom-4 right-4 text-white rounded-full px-4 py-4 cursor-pointer flex items-center bg-green-500 hover:bg-green-600"
                            onClick={(e) => {
                                e.preventDefault();
                                !items.some((item) => item.id === product.id)
                                    ? addToCart(product)
                                    : deleteItemFromList(product);
                            }}
                        >
                            <span className="material-symbols-outlined">
                                {items.some((item) => item.id === product.id) ? "delete" : "add"}
                            </span>
                        </button>
                    ) : null}
                </div>
                
                )) : <p>There are no products avaible for this category</p>}
            </div>

            <TuneModal categories={categories} isOpen={isTuneModalOpen} onClose={closeTuneModal} />
        </div>
    );
}


export default detailScreen;