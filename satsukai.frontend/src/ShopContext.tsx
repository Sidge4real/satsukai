import React from "react";
import { IBag, IShopItem } from "../types/IShopItem";

interface IList {
    items: IBag[];
}

interface IContextValue extends IList {
    setShoppingList: React.Dispatch<React.SetStateAction<IList>>;
  }

export const ShopContext = React.createContext<IList>({items: []});