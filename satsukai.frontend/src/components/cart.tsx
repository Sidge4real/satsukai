import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IShopItem } from "../../types/IShopItem";
import Link from "next/link";

interface ICart {
    shoppingList: IShopItem[];
    setShoppingList: Dispatch<SetStateAction<IShopItem[]>>;
    toggleCartOverlay: () => void,
}

const ShopCart = ({shoppingList, setShoppingList, toggleCartOverlay } : ICart) => {
  const [openDetailsMap, setOpenDetailsMap] = useState<{ [key: string]: boolean }>({});


    const toggleDetails = (item: IShopItem) => {
        const updatedShoppingList = shoppingList.map((listItem) =>
          listItem === item ? { ...listItem, openDetails: !listItem.openDetails } : listItem
        );
      
        setShoppingList(updatedShoppingList);
      };
      
      const totalPayment = () => {
        return shoppingList.map(item => {
          return item.amount_to_buy != undefined ? item.amount_to_buy*item.attributes.price : 0
        }).reduce((prev, curr) => prev + curr)
      }
    
      const toggleAmount = (item: IShopItem, action?: string) => {
        if (item.amount_to_buy == undefined || item.amount_to_buy == null) {
          item.amount_to_buy = 1;
        } else {
          if (action == "add" && item.amount_to_buy < 10) {
            item.amount_to_buy += 1;
          }
          if (action == "remove" && item.amount_to_buy > 1) {
            item.amount_to_buy -= 1;
          }
        }
        setShoppingList((prevShoppingList) => [...prevShoppingList]);
        return item.amount_to_buy;
      };
    
      const deleteItemFromList = (item: IShopItem) => {
        setShoppingList((prevShoppingList) => prevShoppingList.filter((prevItem) => prevItem !== item));
      }

      useEffect(() => {
        // Wanneer shoppingList wordt gewijzigd, controleer of details voor het eerste item moeten worden geopend
        if (shoppingList.length > 0) {
          const firstItemId = shoppingList[0].id;
          setOpenDetailsMap((prev) => ({ ...prev, [firstItemId]: true }));
        }
      }, [shoppingList]);



    return <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 w-1/2 z-50 flex items-end p-4">
    <div className="bg-white p-4 h-full overflow-y-auto animate-slideInRight absolute top-0 right-0 flex flex-col w-full sm:w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <button className="text-gray-500" onClick={toggleCartOverlay}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      {shoppingList.map((item, index) => (
        <div className='border-b border-gray-300 flex flex-col text-gray-500 mb-4'>
          <div key={index} className="mb-4 pb-4 flex items-center justify-between">
            <div>
              <Link className="hover:underline" href={"/products/" + item.id}>{item.attributes.name}</Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center hover:text-black" onClick={() => toggleAmount(item, "remove")}>
                <span className="material-symbols-outlined">do_not_disturb_on</span>
              </button>
              <p>{item.amount_to_buy == undefined || item.amount_to_buy == null ? toggleAmount(item) : item.amount_to_buy.toString()}</p>
              <button className="flex items-center hover:text-black" onClick={() => toggleAmount(item, "add")}>
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <button className="flex items-center hover:text-red-500 hover:font-bold" onClick={() => deleteItemFromList(item)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          {
            item.openDetails && <div className="details-dropdown">
            <div className='flex items-center justify-between'>
              <p>Price for 1:</p>
              <p>{item.attributes.price} EUR</p>
            </div>
            {item.amount_to_buy != undefined && item.amount_to_buy != null && item.amount_to_buy > 1 && <div className='flex items-center justify-between'>
              <p>Price for {item.amount_to_buy}:</p>
              <p>{item.attributes.price * (item.amount_to_buy || 1)} EUR</p>
            </div>}
          </div>
          }
          <button onClick={() => toggleDetails(item)}><span className="material-symbols-outlined">{!item.openDetails ? "expand_more" : "expand_less"}</span></button>
        </div>
      ))}

      {
        shoppingList.length == 0 && <p>There are no items in your shopping card added...</p>
      }
      {
        shoppingList.length != 0 && <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold">total: {totalPayment()} EUR</p>
          <button className='flex items-center text-white hover:bg-green-600 rounded-md px-3 bg-green-500 px-5 py-2'>Proceed to Payment</button>
        </div>
      }
    </div>
  </div>
}

export default ShopCart;