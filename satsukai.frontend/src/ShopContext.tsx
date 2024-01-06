import React from "react";
import { IShopItem } from "../types/IShopItem";

interface IList {
  items: IShopItem[];
}

export const ShopContext = React.createContext<IList>({
  items: []
});
